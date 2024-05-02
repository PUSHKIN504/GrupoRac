using GestionEmergencias.BussinesLogic;
using Grupo_Rac.DataAccess.Repositorio;
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
        public AccesoService(RolRepositorio rolRepositorio)
        {
            _rolRepositorio = rolRepositorio;
        }

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
