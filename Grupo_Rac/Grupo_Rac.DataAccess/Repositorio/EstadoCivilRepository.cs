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
    public class EstadoCivilRepository : IRepositorio<tbEstadosCiviles>
    {
        public RequestStatus Actualizar(tbEstadosCiviles item)
        {
            throw new NotImplementedException();
        }

        public RequestStatus Eliminar(int? id)
        {
            throw new NotImplementedException();
        }

        public tbEstadosCiviles find(int? id)
        {
            throw new NotImplementedException();
        }

        public RequestStatus Insertar(tbEstadosCiviles item)
        {
            using (var db = new SqlConnection(GrupoRacContext.ConnectionString))
            {
                //pendiente los parametros
                var parameter = new DynamicParameters();
                //parameter.Add("Dept_Id", item.Dep_Id);
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

        public IEnumerable<tbEstadosCiviles> List()
        {
            List<tbEstadosCiviles> result = new List<tbEstadosCiviles>();
            using (var db = new SqlConnection(GrupoRacContext.ConnectionString))
            {
                result = db.Query<tbEstadosCiviles>("[Gral].[SP_EstadosCiviles_Mostrar]", commandType: CommandType.Text).ToList();
                return result;
            }
        }
    }
}
