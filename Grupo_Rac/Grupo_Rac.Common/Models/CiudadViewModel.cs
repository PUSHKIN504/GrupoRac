using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Grupo_Rac.Common.Models
{
    public class CiudadViewModel
    {
        public string Ciu_Id { get; set; }
        public string? Dep_Id { get; set; }
        public string Ciu_Descripcion { get; set; }
        public int? Ciu_Creacion { get; set; }
        public int? Ciu_Modifica { get; set; }
        public DateTime Ciu_Fecha_Creacion { get; set; }
        public DateTime? Ciu_Fecha_Modifica { get; set; }
        public bool? Ciu_Estado { get; set; }
        [NotMapped]
        public string FechaModificacion { get; set; }
        [NotMapped]
        public string FechaCreacion { get; set; }
        [NotMapped]
        public string UsuarioCreacion { get; set; }

        [NotMapped]
        public string UsuarioModificacion { get; set; }
    }
}
