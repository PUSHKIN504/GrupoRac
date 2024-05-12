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
    public class SedeController : Controller
    {
        private readonly GeneralService _generalServices;

        private readonly IMapper _mapper;
        public SedeController(GeneralService generalServices, IMapper mapper)
        {
            _generalServices = generalServices;
            _mapper = mapper;
        }

        [HttpGet("List")]
        public IActionResult Index()
        {
            var list = _generalServices.ListadoSucursal();
            return Ok(list.Data);
        }
        [HttpPost("Create")]
        public IActionResult Insert(SedeViewModel item)
        {
            var model = _mapper.Map<tbSedes>(item);
            var modelo = new tbSedes()
            {
                Sed_Descripcion = item.Sed_Descripcion,
                Ciu_Id = item.Ciu_Id,
                Sed_Creacion = 1,
                Sed_Fecha_Creacion = item.Sed_Fecha_Creacion,
            };
            var list = _generalServices.InsertarSucursal(modelo);
            return Ok(list.Data);
        }
        [HttpGet("Fill/{id}")]
        public IActionResult Llenar(int id)
        {
            var list = _generalServices.obterSucursal(id);
            return Json(list.Data);
        }
        [HttpPut("Edit")]
        public IActionResult Update(SedeViewModel item)
        {
            _mapper.Map<tbSedes>(item);
            var modelo = new tbSedes()
            {
                Sed_Id = item.Sed_Id,
                Sed_Descripcion = item.Sed_Descripcion,
                Ciu_Id = item.Ciu_Id,

                Sed_Modifica = 1,
                Sed_Fecha_Modifica = DateTime.Now
            };
            var list = _generalServices.EditarSucursal(modelo);
            return Ok(list.Data);
        }

        [HttpDelete("Delete")]
        public IActionResult Delete(string Sucu_Id)
        {
            var list = _generalServices.EliminarSucursal(Sucu_Id);
            return Ok(list.Data);
        }

    }
}
