using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Grupo_Rac.Common.Models
{
    public class CompViewModel
    {
        public int Com_Id { get; set; }
        public int? Cli_Id { get; set; }
        public int? Com_Cant { get; set; }
        public decimal? Com_Precio { get; set; }
        public DateTime? Com_Fecha { get; set; }
        public int? Com_Creacion { get; set; }
        public int? Com_Modifica { get; set; }
        public DateTime? Com_Fecha_Creacion { get; set; }
        public DateTime? Com_Fecha_Modifica { get; set; }
        public bool? Com_Estado { get; set; }
    }
}
