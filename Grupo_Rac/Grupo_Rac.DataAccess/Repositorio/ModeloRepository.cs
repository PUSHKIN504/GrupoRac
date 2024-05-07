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
    public class ModeloRepository : IRepositorio<tbModelos>
    {
        public RequestStatus Actualizar(tbModelos item)
        {
            using (var db = new SqlConnection(GrupoRacContext.ConnectionString))
            {
                var parameter = new DynamicParameters();
                parameter.Add("@Mod_Id", item.Mod_Id);
                parameter.Add("@Mar_Descripcion", item.Mar_Descripcion);

                parameter.Add("@Mod_Descripcion", item.Mod_Descripcion);
                parameter.Add("@Mod_Ano", item.Mod_Año);

                parameter.Add("@Mod_Modifica", item.Mod_Modifica);
                parameter.Add("@Mod_Fecha_Modifica", DateTime.Now);

                var result = db.Execute("[Gral].[SP_Modelos_Actualizar]",
                    parameter,
                    commandType: CommandType.StoredProcedure
                    );
                string mensaje = (result == 1) ? "Exito" : "Error";
                return new RequestStatus { CodeStatus = result, MessageStatus = mensaje };
            }
        }

        public RequestStatus Eliminar(int? id)
        {
            using (var db = new SqlConnection(GrupoRacContext.ConnectionString))
            {
                var parametro = new DynamicParameters();
                parametro.Add("@Mod_Id", id);
                var result = db.Execute("[Gral].[SP_Modelos_Eliminar]",
                    parametro,
                     commandType: CommandType.StoredProcedure
                    );

                string mensaje = (result == 1) ? "Exito" : "Error";
                return new RequestStatus { CodeStatus = result, MessageStatus = mensaje };
            }
        }

        public tbModelos find(int? id)
        {
            throw new NotImplementedException();
        }

        public RequestStatus Insertar(tbModelos item)
        {
            using (var db = new SqlConnection(GrupoRacContext.ConnectionString))
            {
                //pendiente los parametros
                var parameter = new DynamicParameters(); 
                parameter.Add("@Mar_Descripcion", item.Mar_Descripcion);

                parameter.Add("@Mod_Descripcion", item.Mod_Descripcion);
                parameter.Add("@Mod_Ano", item.Mod_Año);

                parameter.Add("@Mod_Creacion", item.Mod_Creacion);
                parameter.Add("@Mod_Fecha_Creacion", DateTime.Now);
                var result = db.Execute("[Gral].[SP_Modelos_Insertar]",
                    parameter,
                    commandType: CommandType.StoredProcedure
                    );
                string mensaje = (result == 1) ? "Exito" : "Error";
                return new RequestStatus { CodeStatus = result, MessageStatus = mensaje };
            }
        }

        public IEnumerable<tbModelos> List()
        {
            List<tbModelos> result = new List<tbModelos>();
            using (var db = new SqlConnection(GrupoRacContext.ConnectionString))
            {
                result = db.Query<tbModelos>("[Gral].[sp_modelos_listar]", commandType: CommandType.Text).ToList();
                return result;
            }
        }
    }
}
