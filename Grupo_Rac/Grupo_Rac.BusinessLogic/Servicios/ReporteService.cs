using GestionEmergencias.BussinesLogic;
using Grupo_Rac.DataAccess.Repositorio;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Grupo_Rac.BusinessLogic.Servicios
{
    public class ReporteService
    {
        private readonly ReporteRepository _reporteRepository;

        public ReporteService(ReporteRepository reporteRepository)
        {
            _reporteRepository = reporteRepository;
        }

        public ServiceResult reporteCompras(string? month, string? year)
        {
            var result = new ServiceResult();
            try
            {
                var list = _reporteRepository.reporteCompras(month, year);

                return result.Ok(list);
            }

            catch (Exception ex)
            {

                return result.Error(ex.Message);
            }
        }

        public ServiceResult reporteVentas(string? month, string? year, int? Sed_Id)
        {
            var result = new ServiceResult();
            try
            {
                var list = _reporteRepository.reporteVentas(month, year, Sed_Id);

                return result.Ok(list);
            }

            catch (Exception ex)
            {

                return result.Error(ex.Message);
            }
        }

        public ServiceResult reporteClientes(int? Ciu_Id)
        {
            var result = new ServiceResult();
            try
            {
                var list = _reporteRepository.reporteClientes(Ciu_Id);

                return result.Ok(list);
            }

            catch (Exception ex)
            {

                return result.Error(ex.Message);
            }
        }

        public ServiceResult reporteEmpleados()
        {
            var result = new ServiceResult();
            try
            {
                var list = _reporteRepository.reporteEmpleados();

                return result.Ok(list);
            }

            catch (Exception ex)
            {

                return result.Error(ex.Message);
            }
        }
        public ServiceResult reporteVehiculos()
        {
            var result = new ServiceResult();
            try
            {
                var list = _reporteRepository.reporteVehiculos();

                return result.Ok(list);
            }

            catch (Exception ex)
            {

                return result.Error(ex.Message);
            }
        }
    }
}
