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
        public RequestStatus Insert(tbEstadosCiviles item)
        {
            const string sql = "[Gral].[sp_EstadosCiviles_insertar]";

            using (var db = new SqlConnection(GrupoRacContext.ConnectionString))
            {
                var parametro = new DynamicParameters();
                parametro.Add("@Est_Descripcion", item.Est_Descripcion);
                parametro.Add("@Est_UsuCre", item.Est_UsuCre);
                parametro.Add("@Est_Fecha_Creacion", item.Est_Fecha_Creacion);
                //parametro.Add("@Esta_FechaCreacion", item.Esta_FechaCreacion);

                var result = db.Execute(sql, parametro, commandType: CommandType.StoredProcedure);
                string mensaje = (result == 1) ? "Exito" : "Error";
                return new RequestStatus { CodeStatus = result, MessageStatus = mensaje };
            }
        }

        public IEnumerable<tbEstadosCiviles> List()
        {
            const string sql = "Gral.sp_EstadosCiviles_listar";

            List<tbEstadosCiviles> result = new List<tbEstadosCiviles>();

            using (var db = new SqlConnection(GrupoRacContext.ConnectionString))
            {
                result = db.Query<tbEstadosCiviles>(sql, commandType: CommandType.Text).ToList();

                return result;
            }
        }

        public tbEstadosCiviles Fill(int id)
        {

            tbEstadosCiviles result = new tbEstadosCiviles();
            using (var db = new SqlConnection(GrupoRacContext.ConnectionString))
            {
                var parameter = new DynamicParameters();
                parameter.Add("Est_ID", id);
                result = db.QueryFirst<tbEstadosCiviles>(ScriptBaseDatos.EstadosCivilesllenar, parameter, commandType: CommandType.StoredProcedure);
                return result;
            }

        }

        public RequestStatus Update(tbEstadosCiviles item)
        {
            string sql = ScriptBaseDatos.EstadosCivilesActualizar;

            using (var db = new SqlConnection(GrupoRacContext.ConnectionString))
            {
                var parameter = new DynamicParameters();
                parameter.Add("@Est_ID", item.Est_ID);
                parameter.Add("@Est_Descripcion", item.Est_Descripcion);

                parameter.Add("@Est_UsuModi", item.Est_UsuModi);
                parameter.Add("@Est_Fecha_Modifica", item.Est_Fecha_Modifica);

                var result = db.Execute(sql, parameter, commandType: CommandType.StoredProcedure);
                string mensaje = (result == 1) ? "exito" : "error";
                return new RequestStatus { CodeStatus = result, MessageStatus = mensaje };

            }
        }
        public RequestStatus Delete(string Esta_Id)
        {
            using (var db = new SqlConnection(GrupoRacContext.ConnectionString))
            {
                var parameter = new DynamicParameters();
                parameter.Add("Est_ID", Esta_Id);

                var result = db.QueryFirst(ScriptBaseDatos.EstadosCivilesEliminar, parameter, commandType: CommandType.StoredProcedure);
                return new RequestStatus { CodeStatus = result.Resultado, MessageStatus = (result.Resultado == 1) ? "Exito" : "Error" };
            }
        }

        public RequestStatus Insertar(tbEstadosCiviles item)
        {
            throw new NotImplementedException();
        }

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
    }
}
