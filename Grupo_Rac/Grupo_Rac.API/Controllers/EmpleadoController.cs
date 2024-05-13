using AutoMapper;
using Grupo_Rac.BusinessLogic.Servicios;
using Grupo_Rac.Common.Models;
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
    public class EmpleadoController : Controller
    {
        private readonly GeneralService _GeneralService;

        private readonly IMapper _mapper;
        public EmpleadoController(GeneralService generalServices, IMapper mapper)
        {
            _GeneralService = generalServices;
            _mapper = mapper;
        }

        [HttpGet("List")]
        public IActionResult Index()
        {
            var list = _GeneralService.ListadoEmpleado();
            return Ok(list.Data);
        }


        [HttpGet("DropDown")]
        public IActionResult List()
        {
            var list = _GeneralService.ListadoEmpleado();
            var drop = list.Data as List<tbEmpleados>;
            var rol = drop.Select(x => new SelectListItem
            {
                Text = x.Empl_Nombre + " " + x.Empl_Apellido,
                Value = x.Empl_Id.ToString()
            }).ToList();


            rol.Insert(0, new SelectListItem { Text = "-- SELECCIONE --", Value = "0" });
            return Ok(rol.ToList());
        }




        [HttpPost("Create")]
        public IActionResult Insert(EmpleadoViewModel item)
        {
            var model = _mapper.Map<tbEmpleados>(item);
            var modelo = new tbEmpleados()
            {
                Empl_Nombre = item.Empl_Nombre,
                Empl_Apellido = item.Empl_Apellido,
                Empl_FechaNac = item.Empl_FechaNac,
                Empl_DNI = item.Empl_DNI,
                Empl_Sexo = item.Empl_Sexo,
                Ciu_Id = item.Ciu_Id,
                Est_ID = item.Est_ID,
                Carg_Id = item.Carg_Id,
                //Empl_Correo = item.Empl_Correo,
                Empl_UsuarioCreacion = 1,
                Empl_FechaCreacion = DateTime.Now

            };
            var list = _GeneralService.InsertarEmpleado(modelo);
            return Ok(new { success = true, message = list.Message });
        }




        [HttpGet("Fill/{id}")]

        public IActionResult Llenar(int id)
        {

            var list = _GeneralService.obterEmpleado(id);
            return Json(list.Data);
        }


        [HttpPut("Edit")]
        public IActionResult Update(EmpleadoViewModel item)
        {
            _mapper.Map<tbEmpleados>(item);
            var modelo = new tbEmpleados()
            {
                Empl_Id = item.Empl_Id,
                Empl_Nombre = item.Empl_Nombre,
                Empl_Apellido = item.Empl_Apellido,
                Empl_DNI = item.Empl_DNI,
                Empl_FechaNac = item.Empl_FechaNac,
                Empl_Sexo = item.Empl_Sexo,
                Ciu_Id = item.Ciu_Id,
                Est_ID = item.Est_ID,
                Carg_Id = item.Carg_Id,

                //Empl_Correo = item.Empl_Correo,
                Empl_UsuarioCreacion = 1,
                Empl_FechaCreacion = DateTime.Now
            };
            var list = _GeneralService.EditarEmpleado(modelo);
            return Ok(new { success = true, message = list.Message });
        }

        [HttpDelete("Delete/{id}")]
        public IActionResult Delete(string id)
        {
            var list = _GeneralService.EliminarEmpleado(id);
            return Ok(new { success = true, message = list.Message });
        }


    }
}
