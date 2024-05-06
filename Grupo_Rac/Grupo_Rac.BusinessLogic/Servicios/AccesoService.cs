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
        public AccesoService(RolRepositorio rolRepositorio, UsuarioRepository usuarioRepository)
        {
            _rolRepositorio = rolRepositorio;
            _usuarioRepository = usuarioRepository;
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
        #endregion
    }
}
