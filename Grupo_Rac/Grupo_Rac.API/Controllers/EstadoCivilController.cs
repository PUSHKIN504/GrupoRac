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
    public class EstadoCivilController : Controller
    {
        private readonly GeneralService _generalService;
        private readonly IMapper _mapper;
        private readonly IWebHostEnvironment environment;
        public EstadoCivilController(GeneralService generalService, IMapper mapper, IWebHostEnvironment webHostEnvironment)
        {
            _generalService = generalService;
            _mapper = mapper;
            this.environment = webHostEnvironment;
        }
        [HttpGet("DropDown")]
        public IActionResult List()
        {
            var list = _generalService.ListadoEstadosCiviles();
            var drop = list.Data as List<tbEstadosCiviles>;
            var rol = drop.Select(x => new SelectListItem
            {
                Text = x.Est_Descripcion,
                Value = x.Est_ID.ToString()
            }).ToList();


            rol.Insert(0, new SelectListItem { Text = "-- SELECCIONE --", Value = "0" });
            return Ok(rol.ToList());
        }

        [HttpGet("List")]
        public IActionResult Index()
        {
            var list = _generalService.ListadoEstadosCiviles();
            return Ok(list.Data);
        }

        [HttpPost("Create")]
        public IActionResult Insert(EstadoCivilViewModel item)
        {
            var model = _mapper.Map<tbEstadosCiviles>(item);
            var modelo = new tbEstadosCiviles()
            {
                Est_Descripcion = item.Est_Descripcion,
                Est_UsuCre = 1,
                Est_Fecha_Creacion = DateTime.Now,
            };
            var list = _generalService.InsertarEstadoCiviles(modelo);
            return Ok(new { success = true, message = list.Message });

        }

        [HttpGet("Fill/{id}")]
        public IActionResult Llenar(int id)
        {

            var list = _generalService.obterEstadosCiviles(id);
            return Json(list.Data);
        }


        [HttpPut("Edit")]
        public IActionResult Update(EstadoCivilViewModel item)
        {
            _mapper.Map<tbEstadosCiviles>(item);
            var modelo = new tbEstadosCiviles()
            {
                Est_ID = item.Est_ID,
                Est_Descripcion = item.Est_Descripcion,
                Est_UsuModi = 1,
                Est_Fecha_Modifica = DateTime.Now
            };
            var list = _generalService.EditarEstadosCiviles(modelo);
            return Ok(new { success = true, message = list.Message });
        }

        [HttpDelete("Delete/{id}")]
        public IActionResult Delete(string id)
        {
            var list = _generalService.EliminarEstadosCiviles(id);
            return Ok(new { success = true, message = list.Message });
        }
    }
}
