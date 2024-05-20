using AutoMapper;
using Grupo_Rac.API.Herramientas;
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
    [Route("Api/[controller]")]
    public class UsuarioController : Controller
    {
        private readonly IMailService _mailService;
        private readonly AccesoService _AccesoService;
        private readonly IMapper _mapper;

        public UsuarioController(AccesoService AccesoService, IMapper mapper, IMailService _MailService)
        {
            _mapper = mapper;
            _AccesoService = AccesoService;
            _mailService = _MailService;
        }
        [HttpGet("List")]
        public IActionResult List()
        {
            var list = _AccesoService.ListarUsuarios();
            if (list.Success)
                return Ok(list.Data);
            else
                return BadRequest(list.Message);
        }


        [HttpGet("Detalles/{userId}")]
        public IActionResult Detalles(int userId)
        {
            var list = _AccesoService.Detalles(userId);
            return Json(list.Data);
        }


        [HttpGet("Login/{usuario},{contraseña}")]
        public IActionResult loginUsuario(string usuario, string contraseña)
        {
            var estado = _AccesoService.LoginUsuario(usuario, contraseña);
            return Ok(estado.Data);

        }

        [HttpGet("ValidarReestablecer/{usuario}")]
        public IActionResult ValidarReestablecer(string usuario)
        {

            Random random = new Random();
            int randomNumber = random.Next(100000, 1000000);
            var estado = _AccesoService.ValidarReestablecer(usuario);
            var lista = estado.Data;
            if (lista.Count > 0)
            {
                var datos = estado.Data as List<tbUsuarios>;
                var first = datos.FirstOrDefault();
                _AccesoService.ImplementarCodigo(randomNumber.ToString(), first.Usu_ID);
                MailData mailData = new MailData();
                //pendiente
                mailData.EmailToId = first.Usu_Correo;
                mailData.EmailToName = "Grapo Rac";
                mailData.EmailSubject = "Codigo de Reestablecimiento de Contraseña";
                mailData.EmailBody = "Su codigo es:" + randomNumber.ToString();
                _mailService.SendGmail(mailData);
            }
            return Ok(estado);

        }

        [HttpGet("MostrarCodigo/{codigo}")]
        public IActionResult MostrarCodigo(string codigo)
        {

            var estado = _AccesoService.MostrarCodigo(codigo);
            return Ok(estado);

        }

        [HttpPost("Insertar")]
        public IActionResult Insertar(UsuarioViewModel item)
        {
            var model = _mapper.Map<tbUsuarios>(item);
            var modelo = new tbUsuarios()
            {
                Usu_Usua = item.Usu_Usua,
                Usu_Contra = item.Usu_Contra,
                Usu_Admin = item.Usu_Admin,
                Rol_Id = item.Rol_Id,
                Empl_Id = item.Empl_Id,
                Usu_UsuCre = 1
            };

            var list = _AccesoService.CrearUsua(modelo);
            return Ok(new { success = true, message = list.Message });
        }

        //pendiente 
        [HttpPost("Reestablecer")]
        public IActionResult Reestablecer(UsuarioViewModel item)
        {
            var model = _mapper.Map<tbUsuarios>(item);
            var modelo = new tbUsuarios()
            {
                Usu_Codigo = item.Usu_Codigo,
                Usu_Contra = item.Usu_Contra,
                Usu_UsuModi = item.Usu_ID
            };

            var list = _AccesoService.Reestablecer(modelo);
            return Ok(list);
        }


        [HttpPut("Actualizar")]
        public IActionResult Actualizar(int id, UsuarioViewModel item)
        {

            var model = _mapper.Map<tbUsuarios>(item);
            var modelo = new tbUsuarios()
            {
                Usu_ID = item.Usu_ID,
                Usu_Usua = item.Usu_Usua,
                Usu_Admin = item.Usu_Admin,
                Rol_Id = item.Rol_Id,
                Empl_Id = item.Empl_Id,
                Usu_UsuModi = 1,
                Usu_FechaModifica = DateTime.Now
            };

            var list = _AccesoService.ActualizarUsua(modelo);
            return Ok(new { success = true, message = list.Message });
        }
        [HttpDelete("Eliminar/{id}")]
        public IActionResult Eliminar(int id)
        {
            var estado = _AccesoService.EliminarUsua(id);
            return Ok(estado);

        }
    }
}