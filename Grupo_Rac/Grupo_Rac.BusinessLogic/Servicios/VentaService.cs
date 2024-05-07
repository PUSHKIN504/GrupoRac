using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using GestionEmergencias.BussinesLogic;
using Grupo_Rac.DataAccess.Repositorio;
using Grupo_Rac.Entities.Entity;

namespace Grupo_Rac.BusinessLogic.Servicios
{
    public class VentaService
    {
        private readonly CompRepository _compRepository;
        public  VentaService (CompRepository compRepository)
        {
            _compRepository = compRepository;
            
        }

        #region Compra
        public ServiceResult ListComp()
        {
            var result = new ServiceResult();
            try
            {
                var lost = _compRepository.List();
                return result.Ok(lost);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }
        public ServiceResult CreateComp(tbCompras item)
        {
            var result = new ServiceResult();
            try
            {
                var lost = _compRepository.Insertar(item);
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
