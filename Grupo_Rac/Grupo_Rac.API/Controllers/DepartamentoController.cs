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
    public class DepartamentoController : Controller
    {
        private readonly GeneralService _generalService;
        private readonly IMapper _mapper;
        public DepartamentoController(GeneralService generalService, IMapper mapper)
        {
            _generalService = generalService;
            _mapper = mapper;
        }
        [HttpGet("List")]
        public IActionResult List()
        {
            var list = _generalService.ListDepto();
            return Ok(list.Data);
        }
        [HttpPost("Insert")]
        public IActionResult Create(DepartamentoViewModel item)
        {
            var model = _mapper.Map<tbDepartamento>(item);
            var modelo = new tbDepartamento()
            {
                Dep_Id = item.Dep_Id,
                Dep_Descripcion = item.Dep_Descripcion,
            };

            var list = _generalService.ListDepto();
            _generalService.InsertarDepto(modelo);
            return Ok(list);

        }

        #region Ciudades
        [HttpGet("ListCiu")]
        public IActionResult ListCiu()
        {
            var list = _generalService.ListCiu();
            return Ok(list.Data);
        }
        #endregion
        #region cliente
        [HttpGet("ListCli")]
        public IActionResult ListCli()
        {
            var list = _generalService.ListCli();
            return Ok(list.Data);
        }
        #endregion
        #region EstadoCivil
        [HttpGet("ListEstC")]
        public IActionResult ListEstC()
        {
            var list = _generalService.ListEstC();
            return Ok(list.Data);
        }
        #endregion
        #region Marca
        [HttpGet("ListMarca")]
        public IActionResult ListMarca()
        {
            var list = _generalService.ListMarca();
            return Ok(list.Data);
        }
        #endregion
        #region Modelo
        [HttpGet("ListModelo")]
        public IActionResult ListModelo()
        {
            var list = _generalService.ListModelo();
            return Ok(list.Data);
        }
        #endregion
        #region Sede
        [HttpGet("ListSede")]
        public IActionResult ListSede()
        {
            var list = _generalService.ListSede();
            return Ok(list.Data);
        }
        #endregion
        #region usuario
        [HttpGet("ListUsua")]
        public IActionResult ListUsua()
        {
            var list = _generalService.ListUsuario();
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
        #region Cargo
        [HttpGet("ListCargo")]
        public IActionResult ListCarg()
        {
            var list = _generalService.ListCargo();
            return Ok(list.Data);
        }
        #endregion
    }
}
