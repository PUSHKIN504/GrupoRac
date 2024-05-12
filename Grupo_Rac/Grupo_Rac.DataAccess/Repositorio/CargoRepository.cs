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
    public class CargoRepository : IRepositorio<tbCargos>
    {
        public RequestStatus Insert(tbCargos item)
        {
            const string sql = "[Gral].[sp_Cargos_insertar]";



            using (var db = new SqlConnection(GrupoRacContext.ConnectionString))
            {
                var parametro = new DynamicParameters();
                parametro.Add("@Crg_Descripcion", item.Crg_Descripcion);
                parametro.Add("@Crg_Creacion", item.Crg_Creacion);
                parametro.Add("@Crg_Fecha_Creacion", item.Crg_Fecha_Creacion);


                var result = db.Execute(sql, parametro, commandType: CommandType.StoredProcedure);
                string mensaje = (result == 1) ? "Exito" : "Error";
                return new RequestStatus { CodeStatus = result, MessageStatus = mensaje };
            }
        }

        public IEnumerable<tbCargos> List()
        {
            const string sql = "Gral.sp_Cargos_listar";

            List<tbCargos> result = new List<tbCargos>();

            using (var db = new SqlConnection(GrupoRacContext.ConnectionString))
            {
                result = db.Query<tbCargos>(sql, commandType: CommandType.Text).ToList();

                return result;
            }
        }

        public tbCargos Fill(int id)
        {

            tbCargos result = new tbCargos();
            using (var db = new SqlConnection(GrupoRacContext.ConnectionString))
            {
                var parameter = new DynamicParameters();
                parameter.Add("Crg_ID", id);
                result = db.QueryFirst<tbCargos>(ScriptBaseDatos.Cargosllenar, parameter, commandType: CommandType.StoredProcedure);
                return result;
            }

        }


        public RequestStatus Update(tbCargos item)
        {
            string sql = ScriptBaseDatos.CargosActualizar;

            using (var db = new SqlConnection(GrupoRacContext.ConnectionString))
            {
                var parameter = new DynamicParameters();
                parameter.Add("@Crg_ID", item.Crg_ID);
                parameter.Add("@Crg_Descripcion", item.Crg_Descripcion);
                parameter.Add("@Crg_Modifica", item.Crg_Modifica);
                parameter.Add("@Crg_Fecha_Modifica", item.Crg_Fecha_Modifica);

                var result = db.Execute(sql, parameter, commandType: CommandType.StoredProcedure);
                string mensaje = (result == 1) ? "exito" : "error";
                return new RequestStatus { CodeStatus = result, MessageStatus = mensaje };

            }
        }



        public RequestStatus Delete(int? Carg_Id)
        {
            using (var db = new SqlConnection(GrupoRacContext.ConnectionString))
            {
                var parameter = new DynamicParameters();
                parameter.Add("Crg_ID", Carg_Id);

                var result = db.QueryFirst(ScriptBaseDatos.CargosEliminar, parameter, commandType: CommandType.StoredProcedure);
                return new RequestStatus { CodeStatus = result.Resultado, MessageStatus = (result.Resultado == 1) ? "Exito" : "Error" };
            }
        }

        public RequestStatus Insertar(tbCargos item)
        {
            throw new NotImplementedException();
        }

        public RequestStatus Actualizar(tbCargos item)
        {
            throw new NotImplementedException();
        }

        public RequestStatus Eliminar(int? id)
        {
            throw new NotImplementedException();
        }

        public tbCargos find(int? id)
        {
            throw new NotImplementedException();
        }
    }
}
