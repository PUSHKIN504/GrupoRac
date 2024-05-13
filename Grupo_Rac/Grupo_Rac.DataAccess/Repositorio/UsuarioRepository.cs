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
    public class UsuarioRepository : IRepositorio<tbUsuarios>
    {
        public RequestStatus Actualizar(tbUsuarios item)
        {
            using (var db = new SqlConnection(GrupoRacContext.ConnectionString))
            {
                var parametro = new DynamicParameters();
                parametro.Add("Usua_Id", item.Usu_ID);
                parametro.Add("Usua_Usuario", item.Usu_Usua);
                parametro.Add("Usua_Admin", item.Usu_Admin);
                parametro.Add("Rol_Id", item.Rol_Id);
                parametro.Add("Empl_Id", item.Empl_Id);
                parametro.Add("UsuarioModificacion", item.Usu_UsuModi);
                parametro.Add("FechaModificacion", DateTime.Now);

                var result = db.Execute(ScriptBaseDatos.Usuarios_Actualizar,
                    parametro,
                     commandType: CommandType.StoredProcedure
                    );

                string mensaje = (result == 1) ? "Exito" : "Error";

                return new RequestStatus { CodeStatus = result, MessageStatus = mensaje };
            }
        }

        //pendiente
        public RequestStatus Reestablecer(tbUsuarios item)
        {
            using (var db = new SqlConnection(GrupoRacContext.ConnectionString))
            {
                var parametro = new DynamicParameters();
                parametro.Add("@usua_Codigo", item.Usu_Codigo);  // Cambiado de usua_id a usua_Codigo
                parametro.Add("@usua_Contraseña", item.Usu_Contra);
                parametro.Add("@usua_FechaModificacion", DateTime.Now);

                var result = db.Execute(ScriptBaseDatos.Usuarios_Reestablecer,
                    parametro,
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
                parametro.Add("Usua_Id", id);


                var result = db.Execute(ScriptBaseDatos.Usuarios_Eliminar,
                    parametro,
                     commandType: CommandType.StoredProcedure
                    );

                string mensaje = (result == 1) ? "Exito" : "Error";

                return new RequestStatus { CodeStatus = result, MessageStatus = mensaje };
            }
        }

        public tbUsuarios find(int? id)
        {
            throw new NotImplementedException();
        }

        public RequestStatus Insertar(tbUsuarios item)
        {
            using (var db = new SqlConnection(GrupoRacContext.ConnectionString))
            {
                var parametro = new DynamicParameters();
                parametro.Add("Usu_Usua", item.Usu_Usua);
                parametro.Add("Usu_Contra", item.Usu_Contra);
                parametro.Add("Usu_Admin", item.Usu_Admin);
                parametro.Add("Rol_Id", item.Rol_Id);
                parametro.Add("Empl_Id", item.Empl_Id);
                parametro.Add("Usu_UsuCre", item.Usu_UsuCre);
                parametro.Add("Usu_FechaCreacion", DateTime.Now);

                var result = db.Execute(ScriptBaseDatos.Usuarios_Insertar,
                    parametro,
                     commandType: CommandType.StoredProcedure
                    );

                string mensaje = (result == 1) ? "Exito" : "Error";

                return new RequestStatus { CodeStatus = result, MessageStatus = mensaje };
            }
        }

        public IEnumerable<tbUsuarios> List()
        {
            List<tbUsuarios> result = new List<tbUsuarios>();
            using (var db = new SqlConnection(GrupoRacContext.ConnectionString))
            {
                result = db.Query<tbUsuarios>(ScriptBaseDatos.Usuarios_Mostrar, commandType: CommandType.Text).ToList();
                return result;
            }
        }
        public RequestStatus InsertarCodigo(string codigo, int id)
        {
            using (var db = new SqlConnection(GrupoRacContext.ConnectionString))
            {
                var parametro = new DynamicParameters();
                parametro.Add("Usu_Codigo", codigo);
                parametro.Add("Usu_Id", id);


                var result = db.Execute(ScriptBaseDatos.Usuarios_Codigo,
                    parametro,
                     commandType: CommandType.StoredProcedure
                    );

                string mensaje = (result == 1) ? "Exito" : "Error";

                return new RequestStatus { CodeStatus = result, MessageStatus = mensaje };
            }
        }
        public IEnumerable<tbUsuarios> Login(string usuario, string contra)
        {


            List<tbUsuarios> result = new List<tbUsuarios>();
            using (var db = new SqlConnection(GrupoRacContext.ConnectionString))
            {
                var parameters = new { Usuario = usuario, Contra = contra };
                result = db.Query<tbUsuarios>(ScriptBaseDatos.Usuario_Login, parameters, commandType: CommandType.StoredProcedure).ToList();
                return result;
            }
        }
        public IEnumerable<tbUsuarios> Detalles(int UsuaID)
        {


            List<tbUsuarios> result = new List<tbUsuarios>();
            using (var db = new SqlConnection(GrupoRacContext.ConnectionString))
            {
                var parameters = new { Usua_Id = UsuaID };
                result = db.Query<tbUsuarios>(ScriptBaseDatos.Usuario_Detalles, parameters, commandType: CommandType.StoredProcedure).ToList();
                return result;
            }
        }

        public IEnumerable<tbUsuarios> SiExisteCodigo(string codigo)
        {


            List<tbUsuarios> result = new List<tbUsuarios>();
            using (var db = new SqlConnection(GrupoRacContext.ConnectionString))
            {
                var parameters = new { codigo = codigo };
                result = db.Query<tbUsuarios>(ScriptBaseDatos.Usuario_MostrarCodigo, parameters, commandType: CommandType.StoredProcedure).ToList();
                return result;
            }
        }

        public IEnumerable<tbUsuarios> ValidarReestablecer(string usuario)
        {
            List<tbUsuarios> result = new List<tbUsuarios>();
            using (var db = new SqlConnection(GrupoRacContext.ConnectionString))
            {
                var parameters = new { Usu_Usua = usuario };
                result = db.Query<tbUsuarios>(ScriptBaseDatos.Usuarios_ValidarReestablecer, parameters, commandType: CommandType.StoredProcedure).ToList();
                return result;
            }
        }
    }
}
