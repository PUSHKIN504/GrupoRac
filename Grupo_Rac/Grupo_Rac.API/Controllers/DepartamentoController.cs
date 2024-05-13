﻿using AutoMapper;
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
using Microsoft.AspNetCore.Mvc.Rendering;

namespace Grupo_Rac.API.Controllers
{
    [ApiController]
    [Route("API/[controller]")]
    public class DepartamentoController : Controller
    {
        private readonly GeneralService _generalService;
        private readonly IMapper _mapper;
        private readonly IWebHostEnvironment environment;

        public DepartamentoController(GeneralService generalService, IMapper mapper, IWebHostEnvironment webHostEnvironment)
        {
            _generalService = generalService;
            _mapper = mapper;
            this.environment = webHostEnvironment;

        }

        [HttpGet("List")]
        public IActionResult Index()
        {
            var list = _generalService.ListadoDepartamentos();
            return Ok(list.Data);
        }

        [HttpGet("DropDown")]
        public IActionResult List()
        {
            var list = _generalService.ListadoDepartamentos();
            var drop = list.Data as List<tbDepartamento>;
            var rol = drop.Select(x => new SelectListItem
            {
                Text = x.Dep_Descripcion,
                Value = x.Dep_Id
            }).ToList();


            rol.Insert(0, new SelectListItem { Text = "-- SELECCIONE --", Value = "0" });
            return Ok(rol.ToList());
        }

        [HttpPost("Create")]
        public IActionResult Create(DepartamentoViewModel item)
        {
            var model = _mapper.Map<tbDepartamento>(item);
            var modelo = new tbDepartamento()
            {
                Dep_Id = item.Dep_Id,
                Dep_Descripcion = item.Dep_Descripcion,
                Dep_Creacion = item.Dep_Creacion,
                Dep_Fecha_Creacion = DateTime.Now,
            };

            var list = _generalService.InsertarDepto(modelo);
            return Ok(new { success = true, message = list.Message });

        }

        [HttpGet("Fill/{id}")]

        public IActionResult Llenar(string id)
        {

            var list = _generalService.obterDepto(id);
            return Json(list.Data);
        }


        [HttpPut("Edit")]
        public IActionResult Update(DepartamentoViewModel item)
        {
            _mapper.Map<tbDepartamento>(item);
            var modelo = new tbDepartamento()
            {
                Dep_Id = item.Dep_Id,
                Dep_Descripcion = item.Dep_Descripcion,
                Dep_Modifica = 1,
                Dep_Fecha_Modifica = DateTime.Now
            };
            var list = _generalService.EditarDepto(modelo);
            return Ok(new { success = true, message = list.Message });
        }

        [HttpDelete("Delete/{id}")]
        public IActionResult Delete(string id)
        {
            var list = _generalService.EliminarDepto(id);
            return Ok(new { success = true, message = list.Message });
        }


        

<<<<<<< HEAD
            return Ok(listado.Data);
        }

        #region
        [HttpGet("generatepdf")]
        public async Task<IActionResult> GeneratePDF(string InvoiceNo)
        {
            var document = new PdfDocument();
            string imgeurl = "data:image/png;base64, " + Getbase64string() + "";

            string[] copies = { "Customer copy", "Comapny Copy" };
            for (int i = 0; i < copies.Length; i++)
            {
                //InvoiceHeader header = await this._container.GetAllInvoiceHeaderbyCode(InvoiceNo);
                //List<InvoiceDetail> detail = await this._container.GetAllInvoiceDetailbyCode(InvoiceNo);
                string htmlcontent = "<div style='width:100%; text-align:center'>";
                htmlcontent += "<img style='width:80px;height:80%' src='" + imgeurl + "'   />";
                htmlcontent += "<h2>" + copies[i] + "</h2>";
                htmlcontent += "<h2>Welcome to Nihira Techiees</h2>";



                //if (header != null)
                //{
                //    htmlcontent += "<h2> Invoice No:" + header.InvoiceNo + " & Invoice Date:" + header.InvoiceDate + "</h2>";
                //    htmlcontent += "<h3> Customer : " + header.CustomerName + "</h3>";
                //    htmlcontent += "<p>" + header.DeliveryAddress + "</p>";
                //    htmlcontent += "<h3> Contact : 9898989898 & Email :ts@in.com </h3>";
                //    htmlcontent += "<div>";
                //}



                htmlcontent += "<table style ='width:100%; border: 1px solid #000'>";
                htmlcontent += "<thead style='font-weight:bold'>";
                htmlcontent += "<tr>";
                htmlcontent += "<td style='border:1px solid #000'> Product Code </td>";
                htmlcontent += "<td style='border:1px solid #000'> Description </td>";
                htmlcontent += "<td style='border:1px solid #000'>Qty</td>";
                htmlcontent += "<td style='border:1px solid #000'>Price</td >";
                htmlcontent += "<td style='border:1px solid #000'>Total</td>";
                htmlcontent += "</tr>";
                htmlcontent += "</thead >";

                htmlcontent += "<tbody>";
                //if (detail != null && detail.Count > 0)
                //{
                //    detail.ForEach(item =>
                //    {
                //        htmlcontent += "<tr>";
                //        htmlcontent += "<td>" + item.ProductCode + "</td>";
                //        htmlcontent += "<td>" + item.ProductName + "</td>";
                //        htmlcontent += "<td>" + item.Qty + "</td >";
                //        htmlcontent += "<td>" + item.SalesPrice + "</td>";
                //        htmlcontent += "<td> " + item.Total + "</td >";
                //        htmlcontent += "</tr>";
                //    });
                //}
                htmlcontent += "</tbody>";


                htmlcontent += "</table>";
                htmlcontent += "</div>";

                htmlcontent += "<div style='text-align:right'>";
                htmlcontent += "<h1> Summary Info </h1>";
                htmlcontent += "<table style='border:1px solid #000;float:right' >";
                htmlcontent += "<tr>";
                htmlcontent += "<td style='border:1px solid #000'> Summary Total </td>";
                htmlcontent += "<td style='border:1px solid #000'> Summary Tax </td>";
                htmlcontent += "<td style='border:1px solid #000'> Summary NetTotal </td>";
                htmlcontent += "</tr>";
                //if (header != null)
                //{
                //    htmlcontent += "<tr>";
                //    htmlcontent += "<td style='border: 1px solid #000'> " + header.Total + " </td>";
                //    htmlcontent += "<td style='border: 1px solid #000'>" + header.Tax + "</td>";
                //    htmlcontent += "<td style='border: 1px solid #000'> " + header.NetTotal + "</td>";
                //    htmlcontent += "</tr>";
                //}
                htmlcontent += "</table>";

                htmlcontent += "</div>";

                htmlcontent += "</div>";


                PdfGenerator.AddPdfPages(document, htmlcontent, PageSize.A4);

            }
            byte[]? response = null;
            using (MemoryStream ms = new MemoryStream())
            {
                document.Save(ms);
                response = ms.ToArray();
            }
            string Filename = "Invoice_" + InvoiceNo + ".pdf";
            return File(response, "application/pdf", Filename);
        }

        [NonAction]
        public string Getbase64string()
        {
            string filepath = this.environment.WebRootPath + "\\Uploads\\common\\logo.jpg";
            byte[] imgarray = System.IO.File.ReadAllBytes(filepath);
            string base64 = Convert.ToBase64String(imgarray);
            return base64;
        }
        #endregion
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

        [HttpPost("InsertMarc")]
        public IActionResult CreateMarca(MarcaViewModel item)
        {
            var model = _mapper.Map<tbMarcas>(item);
            var modelo = new tbMarcas()
            {
                Mar_Descripcion = item.Mar_Descripcion,
            };

            var list = _generalService.ListMarca();
            _generalService.InsertarMarca(modelo);
            return Ok(list);

        }
        #endregion
=======
>>>>>>> yordin
        #region Modelo
        [HttpGet("ListModelo")]
        public IActionResult ListModelo()
        {
            var list = _generalService.ListModelo();
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


    }
}
