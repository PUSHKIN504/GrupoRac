using GestionEmergencias.BussinesLogic;
using Grupo_Rac.DataAccess.Repositorio;
using Grupo_Rac.Entities.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Grupo_Rac.BusinessLogic.Servicios
{
    public class AccesoService
    {
        private readonly RolRepositorio _rolRepositorio;
        private readonly UsuarioRepository _usuarioRepository;
        private readonly pantallaRolesRepository _pantallaRolesRepository;
        public AccesoService(RolRepositorio rolRepositorio, UsuarioRepository usuarioRepository, pantallaRolesRepository pantallaRolesRepository)
        {
            _rolRepositorio = rolRepositorio;
            _usuarioRepository = usuarioRepository;
            _pantallaRolesRepository = pantallaRolesRepository;
        }

        #region Usuario
        public ServiceResult ListarUsuarios()
        {
            var result = new ServiceResult();
            try
            {
                var lost = _usuarioRepository.List();

                return result.Ok(lost);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }


        public ServiceResult Detalles(int UsuaID)
        {
            var result = new ServiceResult();
            try
            {
                var lost = _usuarioRepository.Detalles(UsuaID);

                return result.Ok(lost);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }
        public ServiceResult CrearUsua(tbUsuarios item)
        {
            var result = new ServiceResult();
            try
            {
                var lost = _usuarioRepository.Insertar(item);

                if (lost.CodeStatus > 0)
                {
                    return result.Ok(lost);
                }
                else
                {
                    lost.MessageStatus = (lost.CodeStatus == 0) ? "401 Error de consulta" : lost.MessageStatus;
                    return result.Error(lost);
                }


            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult ImplementarCodigo(string codigo, int id)
        {
            var result = new ServiceResult();
            try
            {
                var lost = _usuarioRepository.InsertarCodigo(codigo, id);

                if (lost.CodeStatus > 0)
                {
                    return result.Ok(lost);
                }
                else
                {
                    lost.MessageStatus = (lost.CodeStatus == 0) ? "401 Error de consulta" : lost.MessageStatus;
                    return result.Error(lost);
                }


            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        //pendiente
        public ServiceResult Reestablecer(tbUsuarios item)
        {
            var result = new ServiceResult();
            try
            {
                var lost = _usuarioRepository.Reestablecer(item);

                if (lost.CodeStatus > 0)
                {
                    return result.Ok(lost);
                }
                else
                {
                    lost.MessageStatus = (lost.CodeStatus == 0) ? "401 Error de consulta" : lost.MessageStatus;
                    return result.Error(lost);
                }


            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }


        public ServiceResult EliminarUsua(int? id)
        {
            var result = new ServiceResult();
            try
            {
                var lost = _usuarioRepository.Eliminar(id);

                if (lost.CodeStatus > 0)
                {
                    return result.Ok(lost);
                }
                else
                {
                    lost.MessageStatus = (lost.CodeStatus == 0) ? "401 Error de consulta" : lost.MessageStatus;
                    return result.Error(lost);
                }


            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }
        public ServiceResult ActualizarUsua(tbUsuarios item)
        {
            var result = new ServiceResult();
            try
            {
                var lost = _usuarioRepository.Actualizar(item);

                if (lost.CodeStatus > 0)
                {
                    return result.Ok(lost);
                }
                else
                {
                    lost.MessageStatus = (lost.CodeStatus == 0) ? "401 Error de consulta" : lost.MessageStatus;
                    return result.Error(lost);
                }


            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }
        public ServiceResult LoginUsuario(string usuario, string contraseña)
        {
            var result = new ServiceResult();
            try
            {
                var lost = _usuarioRepository.Login(usuario, contraseña);

                return result.Ok(lost);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult MostrarCodigo(string codigo)
        {
            var result = new ServiceResult();
            try
            {
                var lost = _usuarioRepository.SiExisteCodigo(codigo);

                return result.Ok(lost);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }
        public ServiceResult ValidarReestablecer(string usuario)
        {
            var result = new ServiceResult();
            try
            {
                var lost = _usuarioRepository.ValidarReestablecer(usuario);

                return result.Ok(lost);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        #endregion

        #region Rol
        public ServiceResult ListRoles()
        {
            var result = new ServiceResult();
            try
            {
                var roles = _rolRepositorio.List();
                return result.Ok(roles);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult ListadoRol()
        {
            var result = new ServiceResult();
            try
            {
                var list = _rolRepositorio.List();
                return result.Ok(list);
            }

            catch (Exception ex)
            {

                return result.Error(ex.Message);
            }
        }




        public ServiceResult EditarRol(tbRoles item)
        {
            var result = new ServiceResult();
            try
            {
                var list = _rolRepositorio.Update(item);
                if (list.CodeStatus > 0)
                {
                    return result.Ok("okis", list);
                }
                else
                {
                    return result.Error("Y existe un registro con ese nombre");
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex);
            }
        }
        public ServiceResult EliminarRol(string Role_Id)
        {
            var result = new ServiceResult();
            try
            {
                var list = _rolRepositorio.Delete(Role_Id);
                if (list.CodeStatus > 0)
                {
                    return result.Ok($"La accion ha sido existosa", list);
                }
                else
                {
                    return result.Error("No se pudo realizar la accion");
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex);
            }
        }

        public string InsertarRol(tbRoles item)
        {
            string error = "";
            try
            {
                int result = _rolRepositorio.Insert(item);
                if (result == 0)
                    error = "el codigo no es valido";
                else error = result.ToString();
            }
            catch (Exception ex)
            {
                error = ex.Message;
            }
            return error;
        }

        public ServiceResult obterRol(int id)
        {
            var result = new ServiceResult();
            try
            {
                var list = _rolRepositorio.Fill(id);

                return result.Ok(list);
            }
            catch (Exception ex)
            {
                return result.Error(ex);
            }
        }

        public ServiceResult ListadoPantallas()
        {
            var result = new ServiceResult();
            try
            {
                var list = _rolRepositorio.Listpantallas();
                return result.Ok(list);
            }

            catch (Exception ex)
            {

                return result.Error(ex.Message);
            }
        }

        #endregion

        #region RolesPantalla
        public ServiceResult ListadoPantallaRoles()
        {
            var result = new ServiceResult();
            try
            {
                var list = _pantallaRolesRepository.List();
                return result.Ok(list);
            }

            catch (Exception ex)
            {

                return result.Error(ex.Message);
            }
        }

        public ServiceResult EditarRolesPantalla(tbPantallas_PorRoles item)
        {
            var result = new ServiceResult();
            try
            {
                var list = _pantallaRolesRepository.Update(item);
                if (list.CodeStatus > 0)
                {
                    return result.Ok("okis", list);
                }
                else
                {
                    return result.Error("Y existe un registro con ese nombre");
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex);
            }
        }
        public ServiceResult EliminarRolesPantalla(string Role_Id)
        {
            var result = new ServiceResult();
            try
            {
                var list = _pantallaRolesRepository.Delete(Role_Id);
                if (list.CodeStatus > 0)
                {
                    return result.Ok($"La accion ha sido existosa", list);
                }
                else
                {
                    return result.Error("No se pudo realizar la accion");
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex);
            }
        }
        public ServiceResult InsertarRolesPantalla(tbPantallas_PorRoles item)
        {
            var result = new ServiceResult();
            try
            {
                var list = _pantallaRolesRepository.Insert(item);
                if (list.CodeStatus > 0)
                {
                    return result.Ok(list);
                }
                else
                {
                    return result.Error(list);
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }
        public ServiceResult obterRolesPantalla(int id)
        {
            var result = new ServiceResult();
            try
            {
                var list = _pantallaRolesRepository.Fill(id);

                return result.Ok(list);
            }
            catch (Exception ex)
            {
                return result.Error(ex);
            }
        }

        public ServiceResult ObtenerRoles(int id)
        {
            var result = new ServiceResult();
            try
            {
                var list = _pantallaRolesRepository.Fill2(id);

                return result.Ok(list);
            }
            catch (Exception ex)
            {
                return result.Error(ex);
            }
        }
        #endregion
    }
}
