using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Grupo_Rac.Common.Models
{
    public class RolViewModel
    {
        public int Rol_Id { get; set; }
        public string Rol_Descripcion { get; set; }
        public int? Rol_Creacion { get; set; }
        public DateTime? Rol_FechaCreacion { get; set; }
        public int? Rol_Modifica { get; set; }
        public DateTime? Rol_FechaModificacion { get; set; }
        public bool? Rol_Estado { get; set; }
    }
}
