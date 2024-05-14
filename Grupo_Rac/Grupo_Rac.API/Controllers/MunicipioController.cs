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
    public class MunicipioController : Controller
    {
        private readonly GeneralService _generalService;
        private readonly IMapper _mapper;
        private readonly IWebHostEnvironment environment;
        public MunicipioController(GeneralService generalService, IMapper mapper, IWebHostEnvironment webHostEnvironment)
        {
            _generalService = generalService;
            _mapper = mapper;
            this.environment = webHostEnvironment;
        }

        [HttpGet("List")]
        public IActionResult Index()
        {
            var list = _generalService.ListadoMunicipio();

            return Ok(list.Data);
        }


        [HttpGet("Lista/{id}")]
        public IActionResult IndexPorMunicipio(string id)
        {
            var list = _generalService.ListadoMunicipioDepartamento(id);
            var drop = list.Data as List<tbCiudades>;
            var rol = drop.Select(x => new SelectListItem
            {
                Text = x.Ciu_Descripcion,
                Value = x.Ciu_Id
            }).ToList();


            rol.Insert(0, new SelectListItem { Text = "-- SELECCIONE --", Value = "0" });
            return Ok(rol.ToList());
        }





        [HttpPost("Create")]
        public IActionResult Insert(CiudadViewModel item)
        {
            var model = _mapper.Map<tbCiudades>(item);
            var modelo = new tbCiudades()
            {
                Ciu_Id = item.Ciu_Id,

                Ciu_Descripcion = item.Ciu_Descripcion,

                Dep_Id = item.Dep_Id,
                Ciu_Creacion = 1,
                Ciu_Fecha_Creacion = DateTime.Now,
            };
            var list = _generalService.InsertarMunicipio(modelo);

            return Ok(new { success = true, message = list.Message });
        }

        [HttpGet("Fill/{id}")]

        public IActionResult Llenar(string id)
        {

            var list = _generalService.obterMunicipio(id);
            return Json(list.Data);
        }


        [HttpPut("Edit")]
        public IActionResult Edit(CiudadViewModel item)
        {
            _mapper.Map<tbCiudades>(item);
            var modelo = new tbCiudades()
            {
                Ciu_Id = item.Ciu_Id,
                Ciu_Descripcion = item.Ciu_Descripcion,

                Dep_Id = item.Dep_Id,
                Ciu_Modifica = 1,
                Ciu_Fecha_Modifica = DateTime.Now
            };
            var list = _generalService.EditarMunicipio(modelo);

            return Ok(new { success = true, message = list.Message });
        }

        [HttpDelete("Delete/{id}")]
        public IActionResult Delete(string id)
        {
            var list = _generalService.EliminarMunicipio(id);
            return Ok(new { success = true, message = list.Message });
        }
    }
}
