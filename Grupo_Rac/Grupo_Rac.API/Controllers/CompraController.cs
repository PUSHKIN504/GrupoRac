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
            return Ok(list.Data);
        }

        [HttpPost("Create")]
        public IActionResult CreateComp(CompViewModel item)
        {

            var comp = _mapper.Map<tbCompras>(item);
            var compra = new tbCompras()
            {

                Cli_DNI = item.Cli_DNI,
                Com_Fecha = item.Com_Fecha,
                Com_Fecha_Creacion = item.Com_Fecha_Creacion
               


            };
            var list = _ventaService.CreateComp(compra);
            return Ok(list.Data);
        }
    }
}
