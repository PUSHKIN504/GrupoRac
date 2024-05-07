using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Grupo_Rac.Common.Models
{
    public class ModeloViewModel
    {
        public int Mod_Id { get; set; }
        public string Mod_Descripcion { get; set; }
        public DateTime? Mod_Año { get; set; }
        public int? Mar_Id { get; set; }
        public int? Mod_Creacion { get; set; }
        public int? Mod_Modifica { get; set; }
        public DateTime? Mod_Fecha_Creacion { get; set; }
        public DateTime? Mod_Fecha_Modifica { get; set; }
        public bool? Mod_Estado { get; set; }
        [NotMapped]
        public string? Mar_Descripcion { get; set; }

    }
}
