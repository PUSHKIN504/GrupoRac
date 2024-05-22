using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Grupo_Rac.Common.Models
{
    public class SedeViewModel
    {
        public int Sed_Id { get; set; }
        public string Sed_Descripcion { get; set; }
        public string Ciu_Id { get; set; }
        public int? Sed_Creacion { get; set; }
        public int? Sed_Modifica { get; set; }
        public DateTime Sed_Fecha_Creacion { get; set; }
        public DateTime? Sed_Fecha_Modifica { get; set; }
        public bool? Sed_Estado { get; set; }
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
