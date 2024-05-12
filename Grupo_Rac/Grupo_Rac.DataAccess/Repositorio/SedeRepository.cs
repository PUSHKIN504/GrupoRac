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
    public class SedeRepository : IRepositorio<tbSedes>
    {
        public RequestStatus Insert(tbSedes item)
        {
            const string sql = "[Gral].[sp_Sucursales_insertar]";

            using (var db = new SqlConnection(GrupoRacContext.ConnectionString))
            {
                var parametro = new DynamicParameters();
                parametro.Add("@Sed_Descripcion", item.Sed_Descripcion);
                parametro.Add("@Muni_Codigo", item.Ciu_Id);

                parametro.Add("@Sed_Creacion", item.Sed_Creacion);
                parametro.Add("@Sed_Fecha_Creacion", item.Sed_Fecha_Creacion);


                var result = db.Execute(sql, parametro, commandType: CommandType.StoredProcedure);
                string mensaje = (result == 1) ? "Exito" : "Error";
                return new RequestStatus { CodeStatus = result, MessageStatus = mensaje };
            }
        }

        public IEnumerable<tbSedes> List()
        {
            const string sql = "[Gral].[sp_sedes_listar]";

            List<tbSedes> result = new List<tbSedes>();

            using (var db = new SqlConnection(GrupoRacContext.ConnectionString))
            {
                result = db.Query<tbSedes>(sql, commandType: CommandType.Text).ToList();

                return result;
            }
        }

        public tbSedes Fill(int id)
        {

            tbSedes result = new tbSedes();
            using (var db = new SqlConnection(GrupoRacContext.ConnectionString))
            {
                var parameter = new DynamicParameters();
                parameter.Add("Sucu_Id", id);
                result = db.QueryFirst<tbSedes>(ScriptBaseDatos.Sucursalesllenar, parameter, commandType: CommandType.StoredProcedure);
                return result;
            }

        }

        public RequestStatus Update(tbSedes item)
        {
            string sql = ScriptBaseDatos.SucursalesActualizar;

            using (var db = new SqlConnection(GrupoRacContext.ConnectionString))
            {
                var parameter = new DynamicParameters();
                parameter.Add("@Sed_Id", item.Sed_Id);
                parameter.Add("@Sed_Descripcion", item.Sed_Descripcion);
                parameter.Add("@Ciu_Id", item.Ciu_Id);

                parameter.Add("@Sed_Modifica", item.Sed_Modifica);
                parameter.Add("@Sed_Fecha_Modifica", item.Sed_Fecha_Modifica);

                var result = db.Execute(sql, parameter, commandType: CommandType.StoredProcedure);
                string mensaje = (result == 1) ? "exito" : "error";
                return new RequestStatus { CodeStatus = result, MessageStatus = mensaje };

            }
        }



        public RequestStatus Delete(string Carg_Id)
        {
            using (var db = new SqlConnection(GrupoRacContext.ConnectionString))
            {
                var parameter = new DynamicParameters();
                parameter.Add("Sed_Id", Carg_Id);

                var result = db.QueryFirst(ScriptBaseDatos.SucursalesEliminar, parameter, commandType: CommandType.StoredProcedure);
                return new RequestStatus { CodeStatus = result.Resultado, MessageStatus = (result.Resultado == 1) ? "Exito" : "Error" };
            }
        }

        IEnumerable<tbSedes> IRepositorio<tbSedes>.List()
        {
            throw new NotImplementedException();
        }

        public RequestStatus Insertar(tbSedes item)
        {
            throw new NotImplementedException();
        }

        public RequestStatus Actualizar(tbSedes item)
        {
            throw new NotImplementedException();
        }

        public RequestStatus Eliminar(int? id)
        {
            throw new NotImplementedException();
        }

        public tbSedes find(int? id)
        {
            throw new NotImplementedException();
        }
    }
}
