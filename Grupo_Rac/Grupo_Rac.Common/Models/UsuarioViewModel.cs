using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Grupo_Rac.Common.Models
{
    public class UsuarioViewModel
    {
        public int Usu_ID { get; set; }
        public string Usu_Usua { get; set; }
        public string Usu_Contra { get; set; }
        public bool? Usu_Admin { get; set; }
        public string Admin { get; set; }
        public string Rol_Descripcion { get; set; }
        public string Ptl_Descripcion { get; set; }
        [NotMapped]
        public string Usu_Nombrecompleto { get; set; }
        public string Usu_Codigo { get; set; }
        public string Usu_Correo { get; set; }
        public int? Rol_Id { get; set; }
        public int? Empl_Id { get; set; }
        public int? Usu_UsuCre { get; set; }
        public int? Usu_UsuModi { get; set; }
        public DateTime? Usu_FechaCreacion { get; set; }
        public DateTime? Usu_FechaModifica { get; set; }
        public int? Usu_Estado { get; set; }
    }
}
