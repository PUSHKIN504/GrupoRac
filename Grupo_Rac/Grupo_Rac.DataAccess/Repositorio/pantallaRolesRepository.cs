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
    public class pantallaRolesRepository : IRepositorio<tbPantallas_PorRoles>
    {
        public RequestStatus Insert(tbPantallas_PorRoles item)
        {
            const string sql = "[Acce].[sp_PantallasPorRoles_insertar]";



            using (var db = new SqlConnection(GrupoRacContext.ConnectionString))
            {
                var parametro = new DynamicParameters();
                parametro.Add("@Rol_Id", item.Rol_Id);
                parametro.Add("@Ptl_Id ", item.Ptl_Id);
                var result = db.Execute(sql, parametro, commandType: CommandType.StoredProcedure);
                string mensaje = (result == 1) ? "Exito" : "Error";
                return new RequestStatus { CodeStatus = result, MessageStatus = mensaje };
            }
        }

        public IEnumerable<tbPantallas_PorRoles> List()
        {
            const string sql = "Acce.sp_PantallasRoles_listar";

            List<tbPantallas_PorRoles> result = new List<tbPantallas_PorRoles>();

            using (var db = new SqlConnection(GrupoRacContext.ConnectionString))
            {
                result = db.Query<tbPantallas_PorRoles>(sql, commandType: CommandType.Text).ToList();

                return result;
            }
        }
        public IEnumerable<tbPantallas_PorRoles> Fill(int id)
        {
            using (var db = new SqlConnection(GrupoRacContext.ConnectionString))
            {
                var parameter = new DynamicParameters();
                parameter.Add("Rol_Id", id);
                return db.Query<tbPantallas_PorRoles>(ScriptBaseDatos.PantallasRolesllenar, parameter, commandType: CommandType.StoredProcedure);
            }
        }

        public IEnumerable<tbRoles> Fill2(int id)
        {
            using (var db = new SqlConnection(GrupoRacContext.ConnectionString))
            {
                var parameter = new DynamicParameters();
                parameter.Add("Rol_Id", id);
                return db.Query<tbRoles>(ScriptBaseDatos.PantallasRolesllenar2, parameter, commandType: CommandType.StoredProcedure);
            }
        }
        public RequestStatus Update(tbPantallas_PorRoles item)
        {
            string sql = ScriptBaseDatos.PantallasRolesActualizar;

            using (var db = new SqlConnection(GrupoRacContext.ConnectionString))
            {
                var parameter = new DynamicParameters();
                parameter.Add("@PaR_Id", item.PaR_Id);
                parameter.Add("@Rol_Id", item.Rol_Id);
                parameter.Add("@Ptl_Id", item.Ptl_Id);

                var result = db.Execute(sql, parameter, commandType: CommandType.StoredProcedure);
                string mensaje = (result == 1) ? "exito" : "error";
                return new RequestStatus { CodeStatus = result, MessageStatus = mensaje };

            }
        }

        public RequestStatus Delete(string Role_Id)
        {
            using (var db = new SqlConnection(GrupoRacContext.ConnectionString))
            {
                var parameter = new DynamicParameters();
                parameter.Add("Rol_Id", Role_Id);

                var result = db.QueryFirst(ScriptBaseDatos.PantallasRolesEliminar, parameter, commandType: CommandType.StoredProcedure);
                return new RequestStatus { CodeStatus = result.Resultado, MessageStatus = (result.Resultado == 1) ? "Exito" : "Error" };
            }
        }

        public IEnumerable<tbPantallas_PorRoles> ValidarReestablecer(string usuario)
        {


            List<tbPantallas_PorRoles> result = new List<tbPantallas_PorRoles>();
            using (var db = new SqlConnection(GrupoRacContext.ConnectionString))
            {
                var parameters = new { Usua_Usuario = usuario };
                result = db.Query<tbPantallas_PorRoles>(ScriptBaseDatos.Usuarios_ValidarReestablecer, parameters, commandType: CommandType.StoredProcedure).ToList();
                return result;
            }
        }

        public RequestStatus Actualizar(tbPantallas_PorRoles item)
        {
            throw new NotImplementedException();
        }

        public RequestStatus Eliminar(int? id)
        {
            throw new NotImplementedException();
        }

        public tbPantallas_PorRoles find(int? id)
        {
            throw new NotImplementedException();
        }

        public RequestStatus Insertar(tbPantallas_PorRoles item)
        {
            throw new NotImplementedException();
        }
        
    }
}
