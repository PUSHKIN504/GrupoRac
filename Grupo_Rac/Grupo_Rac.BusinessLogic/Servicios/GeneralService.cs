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
    public class GeneralService
    {
        private readonly DepartamentoRepositorio _departamentoRepositorio;
        private readonly CiudadReposity _ciudadReposity;
        private readonly ClienteRepository _clienteRepository;
        private readonly EstadoCivilRepository _estadoCivilRepository;
        private readonly MarcaRepository _marcaRepository;
        private readonly ModeloRepository _modeloRepository;
        private readonly SedeRepository _sedeRepository;
        private readonly UsuarioRepository _usuarioRepository;
        private readonly VehiculoRepository _vehiculoRepository;
        private readonly CargoRepository _cargoRepository;
        public GeneralService(DepartamentoRepositorio departamentoRepositorio, CiudadReposity ciudadReposity, ClienteRepository clienteRepository, 
            EstadoCivilRepository estadoCivilRepository, MarcaRepository marcaRepository, ModeloRepository modeloRepository, SedeRepository sedeRepository,
            UsuarioRepository usuarioRepository, VehiculoRepository vehiculoRepository, CargoRepository cargoRepository)
        {
            _departamentoRepositorio = departamentoRepositorio;
            _ciudadReposity = ciudadReposity;
            _clienteRepository = clienteRepository;
            _estadoCivilRepository = estadoCivilRepository;
            _marcaRepository = marcaRepository;
            _modeloRepository = modeloRepository;
            _sedeRepository = sedeRepository;
            _usuarioRepository = usuarioRepository;
            _vehiculoRepository = vehiculoRepository;
            _cargoRepository = cargoRepository;
        }

        #region Departamento

        public ServiceResult ListDepto()
        {
            var result = new ServiceResult();
            try
            {
                var lost = _departamentoRepositorio.List();
                return result.Ok(lost);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }
        public ServiceResult InsertarDepto(tbDepartamento item)
        {
            var resul = new ServiceResult();
            try
            {
                var lost = _departamentoRepositorio.Insertar(item);
                if (lost.CodeStatus > 0)
                {
                    return resul.Ok(lost);
                }
                else
                {
                    lost.MessageStatus = (lost.CodeStatus == 0) ? "401 error de consulta" : lost.MessageStatus;
                    return resul.Error(lost);
                }
            }
            catch (Exception ex)
            {
                return resul.Error(ex.Message);
            }
        }

        public ServiceResult ActualizarDepto(tbDepartamento item)
        {
            var resul = new ServiceResult();
            try
            {
                var lost = _departamentoRepositorio.Update(item);
                if (lost.CodeStatus > 0)
                {
                    return resul.Ok(lost);
                }
                else
                {
                    lost.MessageStatus = (lost.CodeStatus == 0) ? "401 error de consulta" : lost.MessageStatus;
                    return resul.Error(lost);
                }
            }
            catch (Exception ex)
            {
                return resul.Error(ex.Message);
            }
        }


        public ServiceResult EliminarDepto(string Dept_Id)
        {
            var resul = new ServiceResult();
            try
            {
                var lost = _departamentoRepositorio.DeleteS(Dept_Id);
                if (lost.CodeStatus > 0)
                {
                    return resul.Ok(lost);
                }
                else
                {
                    return resul.Error(lost);
                }
            }
            catch (Exception ex)
            {
                return resul.Error(ex.Message);
            }
        }


        public ServiceResult DetallesDepto(string Dept_Id)
        {
            var resul = new ServiceResult();
            try
            {
                var lost = _departamentoRepositorio.findS(Dept_Id);
                return resul.Ok(lost);

            }
            catch (Exception ex)
            {
                return resul.Error(ex.Message);
            }
        }
        #endregion

        #region Ciudades
        public ServiceResult ListCiu()
        {
            var result = new ServiceResult();
            try
            {
                var lost = _ciudadReposity.List();
                return result.Ok(lost);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }
        #endregion

        #region cliente
        public ServiceResult ListCli()
        {
            var result = new ServiceResult();
            try
            {
                var lost = _clienteRepository.List();
                return result.Ok(lost);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        #endregion

        #region Estadocivil
        public ServiceResult ListEstC()
        {
            var result = new ServiceResult();
            try
            {
                var lost = _estadoCivilRepository.List();
                return result.Ok(lost);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        #endregion

        #region Marca
        public ServiceResult ListMarca()
        {
            var result = new ServiceResult();
            try
            {
                var lost = _marcaRepository.List();
                return result.Ok(lost);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult InsertarMarca(tbMarcas item)
        {
            var resul = new ServiceResult();
            try
            {
                var lost = _marcaRepository.Insertar(item);
                if (lost.CodeStatus > 0)
                {
                    return resul.Ok(lost);
                }
                else
                {
                    lost.MessageStatus = (lost.CodeStatus == 0) ? "401 error de consulta" : lost.MessageStatus;
                    return resul.Error(lost);
                }
            }
            catch (Exception ex)
            {
                return resul.Error(ex.Message);
            }
        }

        public ServiceResult EliminarMarc(int id)
        {
            var result = new ServiceResult();
            try
            {
                var lost = _marcaRepository.Eliminar(id);
                if (lost.CodeStatus > 0)
                {
                    return result.Ok(lost);
                }
                else
                {
                    lost.MessageStatus = (lost.CodeStatus == 0) ? "401 Error de Consulta" : lost.MessageStatus;
                    return result.Error(lost);
                }

            }
            catch (Exception ex)
            {

                return result.Error(ex.Message);
            }
        }
        public ServiceResult ActualizarMarc(tbMarcas item)
        {
            var result = new ServiceResult();
            try
            {
                var lost = _marcaRepository.Actualizar(item);
                if (lost.CodeStatus > 0)
                {
                    return result.Ok(lost);
                }
                else
                {
                    lost.MessageStatus = (lost.CodeStatus == 0) ? "401 Error de Consulta" : lost.MessageStatus;
                    return result.Error(lost);
                }

            }
            catch (Exception ex)
            {

                return result.Error(ex.Message);
            }
        }
        #endregion

        #region Modelo
        public ServiceResult ListModelo()
        {
            var result = new ServiceResult();
            try
            {
                var lost = _modeloRepository.List();
                return result.Ok(lost);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult InsertarModelo(tbModelos item)
        {
            var resul = new ServiceResult();
            try
            {
                var lost = _modeloRepository.Insertar(item);
                if (lost.CodeStatus > 0)
                {
                    return resul.Ok(lost);
                }
                else
                {
                    lost.MessageStatus = (lost.CodeStatus == 0) ? "401 error de consulta" : lost.MessageStatus;
                    return resul.Error(lost);
                }
            }
            catch (Exception ex)
            {
                return resul.Error(ex.Message);
            }
        }

        public ServiceResult EliminarModelo(int id)
        {
            var result = new ServiceResult();
            try
            {
                var lost = _modeloRepository.Eliminar(id);
                if (lost.CodeStatus > 0)
                {
                    return result.Ok(lost);
                }
                else
                {
                    lost.MessageStatus = (lost.CodeStatus == 0) ? "401 Error de Consulta" : lost.MessageStatus;
                    return result.Error(lost);
                }

            }
            catch (Exception ex)
            {

                return result.Error(ex.Message);
            }
        }
        public ServiceResult ActualizarModelo(tbModelos item)
        {
            var result = new ServiceResult();
            try
            {
                var lost = _modeloRepository.Actualizar(item);
                if (lost.CodeStatus > 0)
                {
                    return result.Ok(lost);
                }
                else
                {
                    lost.MessageStatus = (lost.CodeStatus == 0) ? "401 Error de Consulta" : lost.MessageStatus;
                    return result.Error(lost);
                }

            }
            catch (Exception ex)
            {

                return result.Error(ex.Message);
            }
        }

        #endregion

        #region Sede
        public ServiceResult ListSede()
        {
            var result = new ServiceResult();
            try
            {
                var lost = _sedeRepository.List();
                return result.Ok(lost);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        #endregion

        #region Usuario
        public ServiceResult ListUsuario()
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

        #endregion

        #region Vehiculo
        public ServiceResult ListVeh()
        {
            var result = new ServiceResult();
            try
            {
                var lost = _vehiculoRepository.List();
                return result.Ok(lost);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        #endregion

        #region Cargo
        public ServiceResult ListCargo()
        {
            var result = new ServiceResult();
            try
            {
                var lost = _cargoRepository.List();
                return result.Ok(lost);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        #endregion
    }
}
