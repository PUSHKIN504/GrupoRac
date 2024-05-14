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
        public class ModeloController : Controller
        {
            private readonly GeneralService _generalService;
            private readonly IMapper _mapper;
            private readonly IWebHostEnvironment environment;

            public ModeloController(GeneralService generalService, IMapper mapper, IWebHostEnvironment webHostEnvironment)
            {
                _generalService = generalService;
                _mapper = mapper;
                this.environment = webHostEnvironment;

            }
        //    [HttpDelete("Delete/{id}")]
        //    public IActionResult Delete(int id)
        //    {
        //        _generalService.EliminarModelo(id);
        //        var list = _generalService.ListModelo();

        //        return Ok(list);

        //    }
        //    [HttpPut("Edit")]
        //    public IActionResult Edit(ModeloViewModel item)
        //    {

        //        var model = _mapper.Map<tbModelos>(item);
        //        var modelo = new tbModelos()
        //        {
                    
        //            Mar_Descripcion = item.Mar_Descripcion,
        //            Mod_Descripcion = item.Mod_Descripcion,
        //            Mod_Año = item.Mod_Año,
        //            Mod_Modifica = item.Mod_Modifica,
        //            Mod_Fecha_Modifica = item.Mod_Fecha_Modifica,
                   

        //        };
        //        var listado = _generalService.ActualizarModelo(modelo);

        //        return Ok(listado);

        //    }

        //[HttpPost("Create")]
        //public IActionResult Create(ModeloViewModel item)
        //{

        //    var model = _mapper.Map<tbModelos>(item);
        //    var modelo = new tbModelos()
        //    {
               
        //        Mar_Descripcion = item.Mar_Descripcion,
        //        Mod_Descripcion = item.Mod_Descripcion,
        //        Mod_Año = item.Mod_Año,
        //        Mod_Creacion = item.Mod_Creacion,
        //        Mod_Fecha_Creacion = item.Mod_Fecha_Creacion,


        //    };
        //    var listado = _generalService.InsertarModelo(modelo);

        //    return Ok(listado);

        //}
    }
}

