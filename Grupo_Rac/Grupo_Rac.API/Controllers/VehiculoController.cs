using AutoMapper;
using Grupo_Rac.BusinessLogic.Servicios;
using Grupo_Rac.Common.Models;
using Grupo_Rac.Entities.Entity;
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
    public class VehiculoController : Controller
    {
        private readonly GeneralService _generalService;
        private readonly IMapper _mapper;
        private readonly IWebHostEnvironment environment;

        public VehiculoController(GeneralService generalService, IMapper mapper, IWebHostEnvironment webHostEnvironment)
        {
            _generalService = generalService;
            _mapper = mapper;
            this.environment = webHostEnvironment;
        }
        [HttpGet("List")]
        public IActionResult ListVeg()
        {
            var list = _generalService.ListVeh();
            return Ok(list);
        }
        [HttpGet("Buscar/{id}")]
        public IActionResult BuscarVeh(int id)
        {
            var list = _generalService.BuscarDetVeh(id);

            return Ok(list);
        }



        [HttpPost("Insertar")]
        public IActionResult CreateVeh(VehiculoViewModel item)
        {

            var comp = _mapper.Map<tbVehiculos>(item);
            var compra = new tbVehiculos()
            {

                Veh_Placa = item.Veh_Placa,
                Mod_Id = item.Mod_Id,
                Sed_Id = item.Sed_Id,
                Com_Id = item.Com_Id,
                Com_Precio = item.Com_Precio,
                Veh_Creacion = item.Veh_Creacion,


            };
            var list = _generalService.InsertVeh(compra);
            return Ok(list);
        }

        [HttpPut("Actualizar")]
        public IActionResult ActualizarVeh(VehiculoViewModel item)
        {

            var veh = _mapper.Map<tbVehiculos>(item);
            var vehiculo = new tbVehiculos()
            {

                Veh_Placa = item.Veh_Placa,
                Mod_Id = item.Mod_Id,
                Sed_Id = item.Sed_Id,
                Com_Id = item.Com_Id,
                Com_Precio = item.Com_Precio,
                Veh_Modifica = item.Veh_Modifica,

            };
            var list = _generalService.ActualizarVeh(vehiculo);
            return Ok(list);
        }

        [HttpPut("Desactivar")]
        public IActionResult DesactivarVeh(VehiculoViewModel item)
        {
            var veh = _mapper.Map<tbVehiculos>(item);
            var vehiculo = new tbVehiculos()
            {

                Veh_Placa = item.Veh_Placa,
               
                Veh_Modifica = item.Veh_Modifica,

            };
            var list = _generalService.DesactivarVeh(vehiculo);
            return Ok(list);
        }

        [HttpDelete("Eliminar/{id}")]
        public IActionResult EliminarVeh(string? id)
        {
            var list = _generalService.EliminarVeh(id);
            return Ok(list);
        }
    }
}
