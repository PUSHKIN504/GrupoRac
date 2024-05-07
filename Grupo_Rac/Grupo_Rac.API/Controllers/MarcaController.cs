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
    public class MarcaController : Controller
    {
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




}
