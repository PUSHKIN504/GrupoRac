using AutoMapper;
using Grupo_Rac.BusinessLogic.Servicios;
using Grupo_Rac.Common.Models;
using Grupo_Rac.Entities.Entity;
using Microsoft.AspNetCore.Mvc;
using PdfSharpCore.Pdf;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
//using SalesOrderAPI.Models; modelo 
using Microsoft.EntityFrameworkCore;
using PdfSharpCore;
using TheArtOfDev.HtmlRenderer.PdfSharp;
using Microsoft.AspNetCore.Hosting;
using System.IO;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace Grupo_Rac.API.Controllers
{
    [ApiController]
    [Route("API/[controller]")]
    public class DepartamentoController : Controller
    {
        private readonly GeneralService _generalService;
        private readonly IMapper _mapper;
        private readonly IWebHostEnvironment environment;

        public DepartamentoController(GeneralService generalService, IMapper mapper, IWebHostEnvironment webHostEnvironment)
        {
            _generalService = generalService;
            _mapper = mapper;
            this.environment = webHostEnvironment;

        }

        [HttpGet("List")]
        public IActionResult Index()
        {
            var list = _generalService.ListadoDepartamentos();
            return Ok(list.Data);
        }

        [HttpGet("Empledept/{sucursal}/{inicio}/{fin}")]
        public IActionResult Empledept(int sucursal, string inicio, string fin)
        {
            var estado = _generalService.Empledept(sucursal, inicio, fin);
            return Ok(estado);

        }
        [HttpGet("Todas/{inicio}/{fin}")]
        public IActionResult Todas(string inicio, string fin)
        {
            var estado = _generalService.Todas(inicio, fin);
            return Ok(estado);

        }

        [HttpGet("DropDown")]
        public IActionResult List()
        {
            var list = _generalService.ListadoDepartamentos();
            var drop = list.Data as List<tbDepartamento>;
            var rol = drop.Select(x => new SelectListItem
            {
                Text = x.Dep_Descripcion,
                Value = x.Dep_Id
            }).ToList();


            rol.Insert(0, new SelectListItem { Text = "-- SELECCIONE --", Value = "0" });
            return Ok(rol.ToList());
        }

        [HttpPost("Create")]
        public IActionResult Create(DepartamentoViewModel item)
        {
            var model = _mapper.Map<tbDepartamento>(item);
            var modelo = new tbDepartamento()
            {
                Dep_Id = item.Dep_Id,
                Dep_Descripcion = item.Dep_Descripcion,
                Dep_Creacion = item.Dep_Creacion,
                Dep_Fecha_Creacion = DateTime.Now,
            };

            var list = _generalService.InsertarDepto(modelo);
            return Ok(new { success = true, message = list.Message });

        }

        [HttpGet("Fill/{id}")]

        public IActionResult Llenar(string id)
        {

            var list = _generalService.obterDepto(id);
            return Json(list.Data);
        }


        [HttpPut("Edit")]
        public IActionResult Update(DepartamentoViewModel item)
        {
            _mapper.Map<tbDepartamento>(item);
            var modelo = new tbDepartamento()
            {
                Dep_Id = item.Dep_Id,
                Dep_Descripcion = item.Dep_Descripcion,
                Dep_Modifica = 1,
                Dep_Fecha_Modifica = DateTime.Now
            };
            var list = _generalService.EditarDepto(modelo);
            return Ok(new { success = true, message = list.Message });
        }

        [HttpDelete("Delete/{id}")]
        public IActionResult Delete(string id)
        {
            var list = _generalService.EliminarDepto(id);
            return Ok(new { success = true, message = list.Message });
        }




        #region Modelo
        [HttpGet("ListModelo")]
        public IActionResult ListModelo()
        {
            var list = _generalService.ListModelo();
            return Ok(list.Data);
        }
        #endregion

        #region Vehiculo
        [HttpGet("ListVehiculo")]
        public IActionResult ListVeh()
        {
            var list = _generalService.ListVeh();
            return Ok(list.Data);
        }
        #endregion


    }
}
