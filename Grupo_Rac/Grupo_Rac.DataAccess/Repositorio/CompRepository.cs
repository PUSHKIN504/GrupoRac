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
            throw new NotImplementedException();
        }

        public RequestStatus Eliminar(int? id)
        {
            throw new NotImplementedException();
        }

        public tbCompras find(int? id)
        {
            throw new NotImplementedException();
        }

        public RequestStatus Insertar(tbCompras item)
        {
            using (var db = new SqlConnection(GrupoRacContext.ConnectionString))
            {
                //pendiente los parametros
                var parameter = new DynamicParameters();
                //parameter.Add("Dept_Id", item.Dep_Id);
                parameter.Add("@DNI", item.Cli_DNI);
                parameter.Add("@UsuCrea", 1);
                parameter.Add( "@fechaCrea", DateTime.Now);

                var result = db.Execute("[Vent].[SP_FactCompra_Insertar]",
                    parameter,
                    commandType: CommandType.StoredProcedure
                    );
                string mensaje = (result == 1) ? "Exito" : "Eroor";
                return new RequestStatus { CodeStatus = result, MessageStatus = mensaje };
            }
        }

        public IEnumerable<tbCompras> List()
        {
            List<tbCompras> result = new List<tbCompras>();
            using (var db = new SqlConnection(GrupoRacContext.ConnectionString))
            {
                result = db.Query<tbCompras>("[Vent].[SP_Compras_listar]", commandType: CommandType.Text).ToList();
                return result;
            }
        }
    }
}
