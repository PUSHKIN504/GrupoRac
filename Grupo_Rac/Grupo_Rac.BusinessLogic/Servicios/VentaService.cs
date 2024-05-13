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
        public ServiceResult BuscarComp(int Comp_Id)
        {
            var result = new ServiceResult();
            try
            {
                var lost = _compRepository.find(Comp_Id);

                if(lost.Com_Id != 0)
                {
                    return result.Ok(lost);
                }
                else
                {
                    return result.Error(lost);
                }
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
                var list = _compRepository.Insertar(item);
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
        public ServiceResult UpdateComp(tbCompras item)
        {
            var result = new ServiceResult();
            try
            {
                var list = _compRepository.Actualizar(item);

                if(list.CodeStatus > 0)
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
        public ServiceResult EliminarComp(int? id)
        {
            var result = new ServiceResult();
            try
            {
                var list = _compRepository.Eliminar(id);

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
        public ServiceResult EmitirComp(tbCompras item)
        {
            var result = new ServiceResult();
            try
            {
                var list = _compRepository.Emitir(item);

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
        #endregion

    }
}
