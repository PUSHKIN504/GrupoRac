using AutoMapper;
using Grupo_Rac.BusinessLogic.Servicios;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Grupo_Rac.API.Controllers
{
    [ApiController]
    [Route("API/[controller]")]
    public class ReporteController : Controller
    {
        private readonly ReporteService _reporteService;
        private readonly IMapper _mapper;
        private readonly IWebHostEnvironment environment;

        public ReporteController(ReporteService reporteService, IMapper mapper, IWebHostEnvironment webHostEnvironment)
        {
            _reporteService = reporteService;
            _mapper = mapper;
            this.environment = webHostEnvironment;
        }

        [HttpGet("reporteCompras/{month}/{year}")]
        public IActionResult reporteCompras(string? month, string? year)
        {
            var list = _reporteService.reporteCompras(month, year);

            return Ok(list);
        }

        [HttpGet("reporteVentas/{month}/{year}/{sede}")]
        public IActionResult reporteVentas(string? month, string? year, int? sede)
        {
            var list = _reporteService.reporteVentas(month, year, sede);

            return Ok(list);
        }

        [HttpGet("reporteClientes/{ciudad}")]
        public IActionResult reporteClientes(int? ciudad)
        {
            var list = _reporteService.reporteClientes(ciudad);

            return Ok(list);
        }

        [HttpGet("reporteEmpleados")]
        public IActionResult reporteEmpleados()
        {
            var list = _reporteService.reporteEmpleados();

            return Ok(list);
        }

        [HttpGet("reporteVehiculos")]
        public IActionResult reporteVehiculos()
        {
            var list = _reporteService.reporteVehiculos();

            return Ok(list);
        }
    }
}
