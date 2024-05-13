using AutoMapper;
using GestionEmergencias.BussinesLogic;
using Grupo_Rac.API.Clases;
using Grupo_Rac.BusinessLogic.Servicios;
using Grupo_Rac.Entities.Entity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Grupo_Rac.API.Controllers
{
    [ApiController]
    [Route("API/[controller]")]
    public class RolController : Controller
    {
        private readonly AccesoService _accesoService;
        private readonly IMapper _mapper;
        public RolController(AccesoService accesoService, IMapper mapper)
        {
            _accesoService = accesoService;
            _mapper = mapper;
        }
        [HttpGet("List")]
        public IActionResult Index()
        {
            var result = _accesoService.ListRoles();
            return Ok(result.Data);
        }

        [HttpGet("DropDown")]
        public IActionResult List()
        {
            var list = _accesoService.ListadoRol();
            var drop = list.Data as List<tbRoles>;
            var rol = drop.Select(x => new SelectListItem
            {
                Text = x.Rol_Descripcion,
                Value = x.Rol_Id.ToString()
            }).ToList();


            rol.Insert(0, new SelectListItem { Text = "-- SELECCIONE --", Value = "0" });
            return Ok(rol.ToList());
        }

        [HttpPost("Create")]

        public IActionResult Insert(FormData formData)
        {
            var msj = new ServiceResult();
            string txtRol = formData.txtRol;
            List<int> pantallasSeleccionadas = formData.pantallasSeleccionadas;

            var modelo = new tbRoles()
            {
                Rol_Descripcion = txtRol,
                Rol_Creacion = 1,
                Rol_FechaCreacion = DateTime.Now
            };
            var list = _accesoService.InsertarRol(modelo);


            int idRol = Int32.Parse(list);

            foreach (var pantalla in pantallasSeleccionadas)
            {
                var modelo2 = new tbPantallas_PorRoles()
                {
                    Ptl_Id = pantalla,
                    Rol_Id = idRol,
                };

                msj = _accesoService.InsertarRolesPantalla(modelo2);

            }


            return Ok(new { success = true, message = msj.Message });
        }

        [HttpGet("Fill/{id}")]
        public IActionResult Llenar(int id)
        {
            var list = _accesoService.obterRolesPantalla(id);
            if (list.Success)
            {
                return Ok(list.Data);
            }
            else
            {
                return BadRequest(list.Message);
            }
        }


        [HttpGet("FillDetalles/{id}")]
        public IActionResult FillDetalles(int id)
        {
            var list = _accesoService.ObtenerRoles(id);
            if (list.Success)
            {
                return Ok(list.Data);
            }
            else
            {
                return BadRequest(list.Message);
            }
        }

        [HttpPut("Edit")]
        public IActionResult Update(FormData formData)
        {

            var msj = new ServiceResult();
            List<int> pantallasSeleccionadas = formData.pantallasSeleccionadas;


            var modelo = new tbRoles()
            {
                Rol_Id = formData.Rol_Id,
                Rol_Descripcion = formData.txtRol,
                Rol_Modifica = 1,
                Rol_FechaModificacion = DateTime.Now

            };
            var list = _accesoService.EditarRol(modelo);

            var idRol = formData.Rol_Id;

            var res = _accesoService.EliminarRolesPantalla(idRol.ToString());

            foreach (var pantalla in pantallasSeleccionadas)
            {
                var modelo2 = new tbPantallas_PorRoles()
                {
                    Ptl_Id = pantalla,
                    Rol_Id = idRol,
                };

                msj = _accesoService.InsertarRolesPantalla(modelo2);

            }


            return Ok(new { success = true, message = msj.Message });

        }


        [HttpDelete("Delete/{id}")]
        public IActionResult Delete(string id)
        {
            var list = _accesoService.EliminarRolesPantalla(id);
            var list2 = _accesoService.EliminarRol(id);

            return Ok(new { success = true, message = list2.Message });
        }

    }
}
