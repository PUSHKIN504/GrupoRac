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
    public class MarcaRepository : IRepositorio<tbMarcas>
    {
        public RequestStatus Actualizar(tbMarcas item)
        {
            throw new NotImplementedException();
        }

        public RequestStatus Eliminar(int? id)
        {
            throw new NotImplementedException();
        }

        public tbMarcas find(int? id)
        {
            throw new NotImplementedException();
        }

        public RequestStatus Insertar(tbMarcas item)
        {
            using (var db = new SqlConnection(GrupoRacContext.ConnectionString))
            {
                //pendiente los parametros
                var parameter = new DynamicParameters();
                //parameter.Add("Dept_Id", item.Dep_Id);
                parameter.Add("@Mar_Descripcion", item.Mar_Descripcion);
                parameter.Add("@Mar_Creacion", 1);
                parameter.Add("@Mar_Fecha_Creacion", DateTime.Now);

                var result = db.Execute("[Gral].[sp_marcas_insertar]",
                    parameter,
                    commandType: CommandType.StoredProcedure
                    );
                string mensaje = (result == 1) ? "Exito" : "Eroor";
                return new RequestStatus { CodeStatus = result, MessageStatus = mensaje };
            }
        }

        public IEnumerable<tbMarcas> List()
        {
            List<tbMarcas> result = new List<tbMarcas>();
            using (var db = new SqlConnection(GrupoRacContext.ConnectionString))
            {
                result = db.Query<tbMarcas>("[Gral].[sp_marcas_listar]", commandType: CommandType.Text).ToList();
                return result;
            }
        }
    }
}
