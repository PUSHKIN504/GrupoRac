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

        public ServiceResult ListadoDepartamentos()
        {
            var result = new ServiceResult();
            try
            {
                var list = _departamentoRepositorio.List();
                return result.Ok(list);
            }

            catch (Exception ex)
            {

                return result.Error(ex.Message);
            }
        }
        public ServiceResult EditarDepto(tbDepartamento item)
        {
            var result = new ServiceResult();
            try
            {
                var list = _departamentoRepositorio.Update(item);
                if (list.CodeStatus > 0)
                {
                    return result.Ok(list);
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
        public ServiceResult EliminarDepto(string Depa_Codigo)
        {
            var result = new ServiceResult();
            try
            {
                var list = _departamentoRepositorio.Delete(Depa_Codigo);
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

        public ServiceResult InsertarDepto(tbDepartamento item)
        {
            var result = new ServiceResult();
            try
            {
                var list = _departamentoRepositorio.Insert(item);
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

        public ServiceResult obterDepto(string id)
        {
            var result = new ServiceResult();
            try
            {
                var list = _departamentoRepositorio.Fill(id);

                return result.Ok(list);
            }
            catch (Exception ex)
            {
                return result.Error(ex);
            }
        }

        #endregion

        #region Municipo
        public ServiceResult ListadoMunicipio()
        {
            var result = new ServiceResult();
            try
            {
                var list = _ciudadReposity.List();
                return result.Ok(list);
            }

            catch (Exception ex)
            {

                return result.Error(ex.Message);
            }
        }

        public ServiceResult ListadoMunicipioDepartamento(string id)
        {
            var result = new ServiceResult();
            try
            {
                var list = _ciudadReposity.Lista(id);
                return result.Ok(list);
            }

            catch (Exception ex)
            {

                return result.Error(ex.Message);
            }
        }
        public ServiceResult EditarMunicipio(tbCiudades item)
        {
            var result = new ServiceResult();
            try
            {
                var list = _ciudadReposity.Update(item);
                if (list.CodeStatus > 0)
                {
                    return result.Ok(list);
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
        public ServiceResult EliminarMunicipio(string Muni_Codigo)
        {
            var result = new ServiceResult();
            try
            {
                var list = _ciudadReposity.Delete(Muni_Codigo);
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
        public ServiceResult InsertarMunicipio(tbCiudades item)
        {
            var result = new ServiceResult();
            try
            {
                var list = _ciudadReposity.Insert(item);
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



        public ServiceResult obterMunicipio(string id)
        {
            var result = new ServiceResult();
            try
            {
                var list = _ciudadReposity.Fill(id);

                return result.Ok(list);
            }
            catch (Exception ex)
            {
                return result.Error(ex);
            }
        }

        #endregion

        #region cliente
        public ServiceResult ListadoClientes()
        {
            var result = new ServiceResult();
            try
            {
                var list = _clienteRepository.List();
                return result.Ok(list);
            }

            catch (Exception ex)
            {

                return result.Error(ex.Message);
            }
        }
        public ServiceResult EditarCliente(tbClientes item)
        {
            var result = new ServiceResult();
            try
            {
                var list = _clienteRepository.Update(item);
                if (list.CodeStatus > 0)
                {
                    return result.Ok(list);
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

        public ServiceResult EliminarClientes(int Clie_Id)
        {
            var result = new ServiceResult();
            try
            {
                var list = _clienteRepository.Delete(Clie_Id);
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
        public ServiceResult InsertarCliente(tbClientes item)
        {
            var result = new ServiceResult();
            try
            {
                var list = _clienteRepository.Insert(item);
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
        public ServiceResult obterCliente(int id)
        {
            var result = new ServiceResult();
            try
            {
                var list = _clienteRepository.Fill(id);

                return result.Ok(list);
            }
            catch (Exception ex)
            {
                return result.Error(ex);
            }
        }

        #endregion

        #region Estadocivil
        public ServiceResult ListadoEstadosCiviles()
        {
            var result = new ServiceResult();
            try
            {
                var list = _estadoCivilRepository.List();
                return result.Ok(list);
            }

            catch (Exception ex)
            {

                return result.Error(ex.Message);
            }
        }
        public ServiceResult EditarEstadosCiviles(tbEstadosCiviles item)
        {
            var result = new ServiceResult();
            try
            {
                var list = _estadoCivilRepository.Update(item);
                if (list.CodeStatus > 0)
                {
                    return result.Ok(list);
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

        public ServiceResult EliminarEstadosCiviles(string Esta_Id)
        {
            var result = new ServiceResult();
            try
            {
                var list = _estadoCivilRepository.Delete(Esta_Id);
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

        public ServiceResult InsertarEstadoCiviles(tbEstadosCiviles item)
        {
            var result = new ServiceResult();
            try
            {
                var list = _estadoCivilRepository.Insert(item);
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
        public ServiceResult obterEstadosCiviles(int id)
        {
            var result = new ServiceResult();
            try
            {
                var list = _estadoCivilRepository.Fill(id);

                return result.Ok(list);
            }
            catch (Exception ex)
            {
                return result.Error(ex);
            }
        }

        #endregion

        #region Marca
        public ServiceResult ListadoMarca()
        {
            var result = new ServiceResult();
            try
            {
                var list = _marcaRepository.List();
                return result.Ok(list);
            }

            catch (Exception ex)
            {

                return result.Error(ex.Message);
            }
        }






        public ServiceResult EditarMarca(tbMarcas item)
        {
            var result = new ServiceResult();
            try
            {
                var list = _marcaRepository.Update(item);
                if (list.CodeStatus > 0)
                {
                    return result.Ok(list);
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

        public ServiceResult EliminarMarcas(string Marc_Id)
        {
            var result = new ServiceResult();
            try
            {
                var list = _marcaRepository.Delete(Marc_Id);
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



        public ServiceResult InsertarMarcas(tbMarcas item)
        {
            var result = new ServiceResult();
            try
            {
                var list = _marcaRepository.Insert(item);
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



        public ServiceResult obterMarcas(int id)
        {
            var result = new ServiceResult();
            try
            {
                var list = _marcaRepository.Fill(id);

                return result.Ok(list);
            }
            catch (Exception ex)
            {
                return result.Error(ex);
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

        #endregion

        #region Sede
        public ServiceResult ListadoSucursal()
        {
            var result = new ServiceResult();
            try
            {
                var list = _sedeRepository.List();
                return result.Ok(list);
            }

            catch (Exception ex)
            {

                return result.Error(ex.Message);
            }
        }

        public ServiceResult EditarSucursal(tbSedes item)
        {
            var result = new ServiceResult();
            try
            {
                var list = _sedeRepository.Update(item);
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
        public ServiceResult EliminarSucursal(string Sucu_Id)
        {
            var result = new ServiceResult();
            try
            {
                var list = _sedeRepository.Delete(Sucu_Id);
                if (list.CodeStatus > 0)
                {
                    return result.Ok($"Exelente chiquit@", list);
                }
                else
                {
                    return result.Error("Hijole ahi si te quedo mal tito");
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex);
            }
        }
        public ServiceResult InsertarSucursal(tbSedes item)
        {
            var result = new ServiceResult();
            try
            {
                var list = _sedeRepository.Insert(item);
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
        public ServiceResult obterSucursal(int id)
        {
            var result = new ServiceResult();
            try
            {
                var list = _sedeRepository.Fill(id);

                return result.Ok(list);
            }
            catch (Exception ex)
            {
                return result.Error(ex);
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
        public ServiceResult ListadoCargos()
        {
            var result = new ServiceResult();
            try
            {
                var list = _cargoRepository.List();
                return result.Ok(list);
            }

            catch (Exception ex)
            {

                return result.Error(ex.Message);
            }
        }
        public ServiceResult EditarCargo(tbCargos item)
        {
            var result = new ServiceResult();
            try
            {
                var list = _cargoRepository.Update(item);
                if (list.CodeStatus > 0)
                {
                    return result.Ok(list);
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
        public ServiceResult EliminarCargo(int Carg_Id)
        {
            var result = new ServiceResult();
            try
            {
                var list = _cargoRepository.Delete(Carg_Id);
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
        public ServiceResult InsertarCargos(tbCargos item)
        {
            var result = new ServiceResult();
            try
            {
                var list = _cargoRepository.Insert(item);
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
        public ServiceResult obterCargos(int id)
        {
            var result = new ServiceResult();
            try
            {
                var list = _cargoRepository.Fill(id);

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
