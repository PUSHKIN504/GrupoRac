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
    public class CiudadReposity : IRepositorio<tbCiudades>
    {
        public RequestStatus Actualizar(tbCiudades item)
        {
            throw new NotImplementedException();
        }

        public RequestStatus Eliminar(int? id)
        {
            throw new NotImplementedException();
        }

        public tbCiudades find(int? id)
        {
            throw new NotImplementedException();
        }

        public RequestStatus Insertar(tbCiudades item)
        {
            using (var db = new SqlConnection(GrupoRacContext.ConnectionString))
            {
                //pendiente los parametros
                var parameter = new DynamicParameters();
                parameter.Add("Dept_Id", item.Dep_Id);
                //parameter.Add("Dept_Descripcion", item.Dep_Descripcion);
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

        public IEnumerable<tbCiudades> List()
        {
            List<tbCiudades> result = new List<tbCiudades>();
            using (var db = new SqlConnection(GrupoRacContext.ConnectionString))
            {
                result = db.Query<tbCiudades>("[Gral].[sp_ciudades_listar]", commandType: CommandType.Text).ToList();
                return result;
            }
        }
    }
}
