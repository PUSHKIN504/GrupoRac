using AutoMapper;
using Grupo_Rac.BusinessLogic.Servicios;
using Grupo_Rac.Common.Models;
using Grupo_Rac.Entities.Entity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Grupo_Rac.API.Controllers
{
    [ApiController]
    [Route("API/[controller]")]
    public class ClienteController : Controller
    {
        private readonly GeneralService _generalServices;

        private readonly IMapper _mapper;
        public ClienteController(GeneralService generalServices, IMapper mapper)
        {
            _generalServices = generalServices;
            _mapper = mapper;
        }

        [HttpGet("List")]
        public IActionResult Index()
        {
            var list = _generalServices.ListadoClientes();
            return Ok(list.Data);
        }

        [HttpGet("Tocalcompras/{sucursal}/{inicio}/{fin}")]
        public IActionResult Tocalcompras(int sucursal, string inicio, string fin)
        {
            var estado = _generalServices.Totalcompras(sucursal, inicio, fin);
            return Ok(estado);

        }
        [HttpGet("Todas/{inicio}/{fin}")]
        public IActionResult Todasss(string inicio, string fin)
        {
            var estado = _generalServices.Todasss(inicio, fin);
            return Ok(estado);

        }

        [HttpPost("Create")]
        public IActionResult Insert(ClientesViewModel item)
        {
            var model = _mapper.Map<tbClientes>(item);
            var modelo = new tbClientes()
            {
                Cli_Nombre = item.Cli_Nombre,
                Cli_DNI = item.Cli_DNI,
                Cli_Direccion = item.Cli_Direccion,
                Ciu_Id = item.Ciu_Id,
                //Clie_FechaNac = item.Clie_FechaNac,
                //Clie_Sexo = item.Clie_Sexo,
                //Esta_Id = item.Esta_Id,
                Cli_Creacion = 1,
                Cli_Fecha_Creacion = DateTime.Now

            };
            var list = _generalServices.InsertarCliente(modelo);
            return Ok(new { success = true, message = list.Message });
        }

        [HttpGet("Fill/{id}")]
        public IActionResult Llenar(int id)
        {

            var list = _generalServices.obterCliente(id);
            return Json(list.Data);
        }

        [HttpPut("Edit")]
        public IActionResult Update(ClientesViewModel item)
        {
            _mapper.Map<tbClientes>(item);
            var modelo = new tbClientes()
            {
                Cli_Id = item.Cli_Id,
                Cli_Nombre = item.Cli_Nombre,
                //Clie_Apellido = item.Clie_Apellido,
                //Clie_FechaNac = item.Clie_FechaNac,
                Cli_DNI = item.Cli_DNI,
                //Clie_Sexo = item.Clie_Sexo,
                Ciu_Id = item.Ciu_Id,
                //Esta_Id = item.Esta_Id,
                Cli_Modifica = 1,
                Cli_Fecha_Modifica = DateTime.Now
            };
            var list = _generalServices.EditarCliente(modelo);
            return Ok(new { success = true, message = list.Message });
        }

        [HttpDelete("Delete/{id}")]
        public IActionResult Delete(int id)
        {
            var list = _generalServices.EliminarClientes(id);
            return Ok(new { success = true, message = list.Message });
        }
    }
}
