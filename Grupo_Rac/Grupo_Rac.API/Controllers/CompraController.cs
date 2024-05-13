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


namespace Grupo_Rac.API.Controllers
{
    [ApiController]
    [Route("API/[controller]")]
    public class CompraController : Controller
    {
        private readonly VentaService _ventaService;
        private readonly IMapper _mapper;
        private readonly IWebHostEnvironment environment;

        public CompraController(VentaService ventaService, IMapper mapper, IWebHostEnvironment webHostEnvironment)
        {
            _ventaService = ventaService;
            _mapper = mapper;
            this.environment = webHostEnvironment;

        }
        [HttpGet("List")]
        public IActionResult ListComp()
        {
            var list = _ventaService.ListComp();
            return Ok(list);
        }
        [HttpGet("Buscar/{id}")]
        public IActionResult BuscarComp(int id)
        {
            var list = _ventaService.BuscarComp(id);
            return Ok(list);
        }

        [HttpPost("Insertar")]
        public IActionResult CreateComp(tbCompras item)
        {
            var comp = _mapper.Map<tbCompras>(item);
            var compra = new tbCompras()
            {

                Cli_DNI = item.Cli_DNI,
                Com_Fecha = item.Com_Fecha,
                Com_Creacion = item.Com_Creacion,
                Com_Precio = item.Com_Precio
                
            };
            var list = _ventaService.CreateComp(compra);
            return Ok(list);
        }

        [HttpPut("Actualizar")]
        public IActionResult ActualizarComp(tbCompras item)
        {
            var comp = _mapper.Map<tbCompras>(item);
            var compra = new tbCompras()
            {
                Com_Id = item.Com_Id,
                Cli_DNI = item.Cli_DNI,
                Com_Fecha = item.Com_Fecha,
                Com_Modifica = item.Com_Modifica,
                Com_Precio = item.Com_Precio

            };
            var list = _ventaService.UpdateComp(compra);
            return Ok(list);
        }
        [HttpPut("Emitir")]
        public IActionResult EmitirComp(tbCompras item)
        {
            var comp = _mapper.Map<tbCompras>(item);
            var compra = new tbCompras()
            {
                Com_Id = item.Com_Id,
                Com_Modifica = item.Com_Modifica,

            };
            var list = _ventaService.EmitirComp(compra);

            return Ok(list);
        }
        [HttpDelete("Eliminar/{id}")]
        public IActionResult EliminarComp(int? id)
        {
            var list = _ventaService.EliminarComp(id);

            return Ok(list);
        }
    }
}
