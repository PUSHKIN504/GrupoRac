using AutoMapper;
using Grupo_Rac.BusinessLogic.Servicios;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Grupo_Rac.API.Controllers
{
    [ApiController]
    [Route("API/[controller]")]
    public class PantallaporRolController : Controller
    {
        private readonly AccesoService _AccesoService;
        private readonly IMapper _mapper;
        public PantallaporRolController(AccesoService AccesoService, IMapper mapper)
        {
            _mapper = mapper;
            _AccesoService = AccesoService;
        }
        [HttpGet("PantdelRol/{id}")]
        public IActionResult PantdelRol(int id)
        {
            var list = _AccesoService.ListPantdelRol(id);
            return Ok(list);
        }
    }
}
