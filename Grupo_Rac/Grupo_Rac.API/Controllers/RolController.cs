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
    public class RolController : Controller
    {
        private readonly AccesoService _accesoService;
        private readonly IMapper _mapper;
        public RolController(AccesoService accesoService, IMapper mapper)
        {
            _accesoService = accesoService;
            _mapper = mapper;
        }
        [HttpGet("List")]
        public IActionResult List()
        {
            var result = _accesoService.ListRoles();
            return Ok(result.Data);
        }

    }
}
