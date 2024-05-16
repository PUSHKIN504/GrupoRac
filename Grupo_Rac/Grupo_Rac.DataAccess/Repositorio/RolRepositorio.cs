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
    public class RolRepositorio : IRepositorio<tbRoles>
    {
        public int Insert(tbRoles item)
        {
            const string sql = "[Acce].[sp_Roles2_insertar]";



            using (var db = new SqlConnection(GrupoRacContext.ConnectionString))
            {
                var parametro = new DynamicParameters();
                parametro.Add("@Rol_Descripcion", item.Rol_Descripcion);
                parametro.Add("@Rol_Creacion", item.Rol_Creacion);
                parametro.Add("@Rol_FechaCreacion", item.Rol_FechaCreacion);
                parametro.Add("@ID", DbType.Int32, direction: ParameterDirection.Output);


                var result = db.Execute(sql, parametro, commandType: CommandType.StoredProcedure);
                int id = parametro.Get<int>("@ID");


                return id;
            }
        }

        public IEnumerable<tbRoles> List()
        {
            const string sql = "Acce.sp_Roles_listar";

            List<tbRoles> result = new List<tbRoles>();

            using (var db = new SqlConnection(GrupoRacContext.ConnectionString))
            {
                result = db.Query<tbRoles>(sql, commandType: CommandType.Text).ToList();

                return result;
            }
        }

        public tbRoles Fill(int id)
        {

            tbRoles result = new tbRoles();
            using (var db = new SqlConnection(GrupoRacContext.ConnectionString))
            {
                var parameter = new DynamicParameters();
                parameter.Add("Rol_Id", id);
                result = db.QueryFirst<tbRoles>(ScriptBaseDatos.Rolesllenar, parameter, commandType: CommandType.StoredProcedure);
                return result;
            }

        }

        public RequestStatus Update(tbRoles item)
        {
            string sql = ScriptBaseDatos.RolesActualizar;

            using (var db = new SqlConnection(GrupoRacContext.ConnectionString))
            {
                var parameter = new DynamicParameters();
                parameter.Add("@Rol_Id", item.Rol_Id);
                parameter.Add("@Rol_Descripcion", item.Rol_Descripcion);
                parameter.Add("@Rol_Modifica", item.Rol_Modifica);
                parameter.Add("@Rol_FechaModificacion", item.Rol_FechaModificacion);

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

                var result = db.QueryFirst(ScriptBaseDatos.RolesEliminar, parameter, commandType: CommandType.StoredProcedure);
                return new RequestStatus { CodeStatus = result.Resultado, MessageStatus = (result.Resultado == 1) ? "Exito" : "Error" };
            }
        }

        public IEnumerable<tbRoles> Listpantallas()
        {
            const string sql = "Acce.sp_Pantallas_listar ";

            List<tbRoles> result = new List<tbRoles>();

            using (var db = new SqlConnection(GrupoRacContext.ConnectionString))
            {
                result = db.Query<tbRoles>(sql, commandType: CommandType.Text).ToList();

                return result;
            }
        }

        public IEnumerable<tbPantallas_PorRoles> ListPadelRol(int id)
        {

            List<tbPantallas_PorRoles> result = new List<tbPantallas_PorRoles>();
            using (var db = new SqlConnection(GrupoRacContext.ConnectionString))
            {
                var parameters = new { Roles_Id = id };
                result = db.Query<tbPantallas_PorRoles>(ScriptBaseDatos.PantallasRoles_ListaPorRol, parameters, commandType: CommandType.StoredProcedure).ToList();
                return result;
            }

        }


        public RequestStatus Actualizar(tbRoles item)
        {
            throw new NotImplementedException();
        }

        public RequestStatus Eliminar(int? id)
        {
            throw new NotImplementedException();
        }

        public tbRoles find(int? id)
        {
            throw new NotImplementedException();
        }

        public RequestStatus Insertar(tbRoles item)
        {
            throw new NotImplementedException();
        }

        //public IEnumerable<tbRoles> List()
        //{
        //    List<tbRoles> result = new List<tbRoles>();
        //    using (var db = new SqlConnection(GrupoRacContext.ConnectionString))
        //    {
        //        result = db.Query<tbRoles>(ScriptBaseDatos.Roles_Mostrar, commandType: CommandType.Text).ToList();
        //        return result;
        //    }
        //}
    }
}
