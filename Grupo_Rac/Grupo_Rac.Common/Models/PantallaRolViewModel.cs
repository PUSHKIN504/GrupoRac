using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Grupo_Rac.Common.Models
{
    public class PantallaRolViewModel
    {
        public int PaR_Id { get; set; }
        public int? Ptl_Id { get; set; }
        public int? Rol_Id { get; set; }
        [NotMapped]
        public string Rol_Descripcion { get; set; }
        public int? PaR_Creacion { get; set; }
        public DateTime? PaR_FechaCreacion { get; set; }
        public int? PaR_Modifica { get; set; }
        public DateTime? PaR_FechaModificacion { get; set; }
        public bool? PaR_Estado { get; set; }

        [NotMapped]
        public string Ptl_Descripcion { get; set; }

        [NotMapped]
        public string UsuarioCreacion { get; set; }

        [NotMapped]
        public string UsuarioModificacion { get; set; }

        [NotMapped]
        public string Role_Rol { get; set; }
    }
}
