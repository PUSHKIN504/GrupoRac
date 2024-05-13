using Dapper;
using Grupo_Rac.Entities.Entity;
using Microsoft.Data.SqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Grupo_Rac.DataAccess.Repositorio
{
    public class CompRepository : IRepositorio<tbCompras>
    {
        public RequestStatus Actualizar(tbCompras item)
        {
            using (var db = new SqlConnection(GrupoRacContext.ConnectionString))
            {
                //pendiente los parametros
                var parameter = new DynamicParameters();
                //parameter.Add("Dept_Id", item.Dep_Id);
                parameter.Add("@Com_Id", item.Com_Id);
                parameter.Add("@DNI", item.Cli_DNI);
                parameter.Add("@Com_Precio", item.Com_Precio);
                parameter.Add("@Com_Modifica", item.Com_Creacion);
                parameter.Add("@Com_Fecha_Modifica", DateTime.Now);


                var result = db.Execute(ScriptBaseDatos.Compra_Actualizar,
                    parameter,
                    commandType: CommandType.StoredProcedure
                    );
                string mensaje = (result > 0) ? "Exito" : "Eroor";
                return new RequestStatus { CodeStatus = result, MessageStatus = mensaje };
            }
        }

        public RequestStatus Eliminar(int? id)
        {
            using (var db = new SqlConnection(GrupoRacContext.ConnectionString))
            {
                //pendiente los parametros
                var parameter = new DynamicParameters();
                //parameter.Add("Dept_Id", item.Dep_Id);
               
                parameter.Add("@Com_Id", id);

                var result = db.Execute(ScriptBaseDatos.Compra_Eliminar,
                    parameter,
                    commandType: CommandType.StoredProcedure
                    );
                string mensaje = (result > 0) ? "Exito" : "Eroor";
                return new RequestStatus { CodeStatus = result, MessageStatus = mensaje };
            }
        }
        public RequestStatus Emitir(tbCompras item)
        {
            using (var db = new SqlConnection(GrupoRacContext.ConnectionString))
            {
                //pendiente los parametros
                var parameter = new DynamicParameters();
                //parameter.Add("Dept_Id", item.Dep_Id);

                parameter.Add("@Com_Id", item.Com_Id);
                parameter.Add("@Com_Modifica", item.Com_Modifica);
                parameter.Add("@Com_Fecha_Modifica", DateTime.Now);

                var result = db.Execute(ScriptBaseDatos.Compra_Emitir,
                    parameter,
                    commandType: CommandType.StoredProcedure
                    );
                string mensaje = (result > 0) ? "Exito" : "Eroor";
                return new RequestStatus { CodeStatus = result, MessageStatus = mensaje };
            }
        }

        public tbCompras find(int? id)
        {
            List<tbCompras> result = new List<tbCompras>();
            using (var db = new SqlConnection(GrupoRacContext.ConnectionString))
            {
                result = db.Query<tbCompras>(ScriptBaseDatos.Compra_Listar, new { Comp_Id = id},commandType: CommandType.StoredProcedure).ToList();

                var list = new tbCompras();

                if (result.Any())
                {
                    list = result.First();
                }
                
                return list;
            }
        }

        public RequestStatus Insertar(tbCompras item)
        {
            using (var db = new SqlConnection(GrupoRacContext.ConnectionString))
            {
                //pendiente los parametros
                var parameter = new DynamicParameters();
                //parameter.Add("Dept_Id", item.Dep_Id);
                parameter.Add("@DNI", item.Cli_DNI);
                parameter.Add("@UsuCrea", item.Com_Creacion);
                parameter.Add( "@fechaCrea", DateTime.Now);
                parameter.Add("@Com_Precio",item.Com_Precio);


                var result = db.Execute(ScriptBaseDatos.Compra_Insertar,
                    parameter,
                    commandType: CommandType.StoredProcedure
                    );
                string mensaje = (result > 0) ? "Exito" : "Eroor";
                return new RequestStatus { CodeStatus = result, MessageStatus = mensaje };
            }
        }

        public IEnumerable<tbCompras> List()
        {
            List<tbCompras> result = new List<tbCompras>();
            using (var db = new SqlConnection(GrupoRacContext.ConnectionString))
            {
                result = db.Query<tbCompras>(ScriptBaseDatos.Compra_Listar, commandType: CommandType.StoredProcedure).ToList();
                return result;
            }
        }
    }
}
