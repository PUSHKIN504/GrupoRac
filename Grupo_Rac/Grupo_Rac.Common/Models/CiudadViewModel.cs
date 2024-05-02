using System;
using System.Collections.Generic;
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
    }
}
