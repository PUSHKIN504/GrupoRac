using AutoMapper;
using Grupo_Rac.BusinessLogic.Servicios;
using Grupo_Rac.Common.Models;
using Grupo_Rac.Entities.Entity;
using Microsoft.AspNetCore.Hosting;
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
    public class CargoController : Controller
    {
        private readonly GeneralService _GeneralService;
        private readonly IMapper _mapper;
        private readonly IWebHostEnvironment environment;
        public CargoController(GeneralService generalService, IMapper mapper, IWebHostEnvironment webHostEnvironment)
        {
            _GeneralService = generalService;
            _mapper = mapper;
            this.environment = webHostEnvironment;
        }
        [HttpGet("DropDown")]
        public IActionResult List()
        {
            var list = _GeneralService.ListadoCargos();
            var drop = list.Data as List<tbCargos>;
            var rol = drop.Select(x => new SelectListItem
            {
                Text = x.Crg_Descripcion,
                Value = x.Crg_ID.ToString()
            }).ToList();


            rol.Insert(0, new SelectListItem { Text = "-- SELECCIONE --", Value = "0" });
            return Ok(rol.ToList());
        }

        [HttpGet("List")]
        public IActionResult Index()
        {
            var list = _GeneralService.ListadoCargos();
            return Ok(list.Data);
        }

        [HttpPost("Create")]
        public IActionResult Insert(CargoViewModel item)
        {
            var model = _mapper.Map<tbCargos>(item);
            var modelo = new tbCargos()
            {
                Crg_Descripcion = item.Crg_Descripcion
,
                Crg_Creacion = 1,
                Crg_Fecha_Creacion = DateTime.Now,
            };
            var list = _GeneralService.InsertarCargos(modelo);
            return Ok(new { success = true, message = list.Message });
        }

        [HttpGet("Fill/{id}")]

        public IActionResult Llenar(int id)
        {

            var list = _GeneralService.obterCargos(id);
            return Json(list.Data);
        }

        [HttpPut("Edit")]
        public IActionResult Update(CargoViewModel item)
        {
            _mapper.Map<tbCargos>(item);
            var modelo = new tbCargos()
            {
                Crg_ID = item.Crg_ID,
                Crg_Descripcion = item.Crg_Descripcion,
                Crg_Modifica = 1,
                Crg_Fecha_Modifica = DateTime.Now
            };
            var list = _GeneralService.EditarCargo(modelo);
            return Ok(new { success = true, message = list.Message });
        }

        [HttpDelete("Delete/{id}")]
        public IActionResult Delete(int id)
        {
            var list = _GeneralService.EliminarCargo(id);
            return Ok(new { success = true, message = list.Message });
        }

    }
}
