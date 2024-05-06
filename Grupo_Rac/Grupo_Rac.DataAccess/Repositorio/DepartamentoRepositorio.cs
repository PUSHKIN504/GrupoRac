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
    public class DepartamentoRepositorio : IRepositorio<tbDepartamento>
    {
        public RequestStatus Actualizar(tbDepartamento item)
        {
            throw new NotImplementedException();
        }

        public RequestStatus Eliminar(int? id)
        {
            throw new NotImplementedException();
        }

        public tbDepartamento find(int? id)
        {
            throw new NotImplementedException();
        }

        public RequestStatus Insertar(tbDepartamento item)
        {
            using (var db = new SqlConnection(GrupoRacContext.ConnectionString))
            {
                //pendiente los parametros
                var parameter = new DynamicParameters();
                parameter.Add("Dept_Id", item.Dep_Id);
                parameter.Add("Dept_Descripcion", item.Dep_Descripcion);
                parameter.Add("Dept_Usua_Creacion", 1);
                parameter.Add("Dept_Fecha_Creacion", DateTime.Now);

                var result = db.Execute(ScriptBaseDatos.Departamentos_Insetar,
                    parameter,
                    commandType: CommandType.StoredProcedure
                    );
                string mensaje = (result == 1) ? "Exito" : "Eroor";
                return new RequestStatus { CodeStatus = result, MessageStatus = mensaje };
            }
        }

        public IEnumerable<tbDepartamento> List()
        {
            List<tbDepartamento> result = new List<tbDepartamento>();
            using (var db = new SqlConnection(GrupoRacContext.ConnectionString))
            {
                result = db.Query<tbDepartamento>(ScriptBaseDatos.Departamentos_Mostrar, commandType: CommandType.Text).ToList();
                return result;
            }
        }
        public RequestStatus DeleteS(string id)
        {
            using (var db = new SqlConnection(GrupoRacContext.ConnectionString))
            {
                var parameter = new DynamicParameters();
                parameter.Add("Dep_Id", id);

                var result = db.Execute(ScriptBaseDatos.Departamentos_Eliminar,
                    parameter,
                    commandType: CommandType.StoredProcedure
                    );
                string mensaje = (result == 1) ? "Exito" : "Eroor";
                return new RequestStatus { CodeStatus = result, MessageStatus = mensaje };
            }
        }

        public IEnumerable<tbDepartamento> findS(string id)
        {
            string sql = ScriptBaseDatos.Departamentos_Detalle;
            List<tbDepartamento> result = new List<tbDepartamento>();

            using (var db = new SqlConnection(GrupoRacContext.ConnectionString))
            {
                var parameters = new { Dep_Id = id };
                result = db.Query<tbDepartamento>(sql, parameters, commandType: CommandType.StoredProcedure).ToList();

                return result;

            }
        }
        public RequestStatus Update(tbDepartamento item)
        {
            using (var db = new SqlConnection(GrupoRacContext.ConnectionString))
            {
                var parameter = new DynamicParameters();
                parameter.Add("Dep_Id", item.Dep_Id);
                parameter.Add("Dep_Descripcion", item.Dep_Descripcion);
                parameter.Add("Dep_Modifica", 1);
                parameter.Add("Dep_Fecha_Modifica", DateTime.Now);

                var result = db.Execute(ScriptBaseDatos.Departamentos_Actualizar,
                    parameter,
                    commandType: CommandType.StoredProcedure
                    );
                string mensaje = (result == 1) ? "Exito" : "Eroor";
                return new RequestStatus { CodeStatus = result, MessageStatus = mensaje };
            }
        }
    }
}
