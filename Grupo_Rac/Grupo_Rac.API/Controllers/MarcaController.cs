using AutoMapper;
using Grupo_Rac.BusinessLogic.Servicios;
using Grupo_Rac.Common.Models;
using Grupo_Rac.Entities.Entity;
using Microsoft.AspNetCore.Mvc;
<<<<<<< HEAD
using PdfSharpCore.Pdf;
=======
using Microsoft.AspNetCore.Mvc.Rendering;
>>>>>>> yordin
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
<<<<<<< HEAD
using Microsoft.AspNetCore.Mvc;
//using SalesOrderAPI.Models; modelo 
using Microsoft.EntityFrameworkCore;
using PdfSharpCore;
using TheArtOfDev.HtmlRenderer.PdfSharp;
using Microsoft.AspNetCore.Hosting;
using System.IO;
=======

>>>>>>> yordin
namespace Grupo_Rac.API.Controllers
{
    [ApiController]
    [Route("API/[controller]")]
    public class MarcaController : Controller
    {
<<<<<<< HEAD
        private readonly GeneralService _generalService;
        private readonly IMapper _mapper;
        private readonly IWebHostEnvironment environment;

        public MarcaController(GeneralService generalService, IMapper mapper, IWebHostEnvironment webHostEnvironment)
        {
            _generalService = generalService;
            _mapper = mapper;
            this.environment = webHostEnvironment;

        }
        [HttpDelete("Delete/{id}")]
        public IActionResult Delete(int id)
        {
            _generalService.EliminarMarc(id);
            var list = _generalService.ListMarca();

            return Ok(list);

        }
        [HttpPut("EditMar")]
        public IActionResult Edit( MarcaViewModel item)
        {

            var model = _mapper.Map<tbMarcas>(item);
            var modelo = new tbMarcas()
            {
                Mar_Id = item.Mar_Id,
                Mar_Descripcion = item.Mar_Descripcion,
                Mar_Modifica = item.Mar_Modifica,
                Mar_Fecha_Modifica = item.Mar_Fecha_Modifica,
                
            };
            var listado = _generalService.ActualizarMarc(modelo);

            return Ok(listado);

        }
    }




=======
        private readonly GeneralService _generalServices;

        private readonly IMapper _mapper;
        public MarcaController(GeneralService generalServices, IMapper mapper)
        {
            _generalServices = generalServices;
            _mapper = mapper;
        }
        [HttpGet("List")]
        public IActionResult Index()
        {
            var list = _generalServices.ListadoMarca();
            return Ok(list.Data);
        }

        [HttpGet("DropDown")]
        public IActionResult List()
        {
            var list = _generalServices.ListadoMarca();
            var drop = list.Data as List<tbMarcas>;
            var rol = drop.Select(x => new SelectListItem
            {
                Text = x.Mar_Descripcion,
                Value = x.Mar_Id.ToString()
            }).ToList();


            rol.Insert(0, new SelectListItem { Text = "-- SELECCIONE --", Value = "0" });
            return Ok(rol.ToList());
        }


        [HttpPost("Create")]
        public IActionResult Insert(MarcaViewModel item)
        {
            var model = _mapper.Map<tbMarcas>(item);
            var modelo = new tbMarcas()
            {
                Mar_Descripcion = item.Mar_Descripcion,
                Mar_Creacion = 1,
                Mar_Fecha_Creacion = item.Mar_Fecha_Creacion,
            };
            var list = _generalServices.InsertarMarcas(modelo);
            return Ok(new { success = true, message = list.Message });
        }




        [HttpGet("Fill/{id}")]

        public IActionResult Llenar(int id)
        {

            var list = _generalServices.obterMarcas(id);
            return Json(list.Data);
        }


        [HttpPut("Edit")]
        public IActionResult Update(MarcaViewModel item)
        {
            _mapper.Map<tbMarcas>(item);
            var modelo = new tbMarcas()
            {
                Mar_Id = item.Mar_Id,
                Mar_Descripcion = item.Mar_Descripcion,
                Mar_Modifica = 1,
                Mar_Fecha_Modifica = DateTime.Now
            };
            var list = _generalServices.EditarMarca(modelo);
            return Ok(new { success = true, message = list.Message });
        }
        [HttpDelete("Delete/{id}")]

        public IActionResult Delete(string id)
        {
            var list = _generalServices.EliminarMarcas(id);
            return Ok(new { success = true, message = list.Message });
        }

        [HttpGet("MarcasPorUsuario/{usuario}")]
        public IActionResult GetMarcasPorUsuario(string usuario)
        {
            var result = _generalServices.ObtenerMarcasPorUsuarioYSede(usuario);
            if (result != null)
                return Ok(result);
            else
                return NotFound("No se encontraron datos.");
        }


    }
>>>>>>> yordin
}
