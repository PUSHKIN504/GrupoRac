using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Grupo_Rac.Common.Models
{
    public class DepartamentoViewModel
    {
        public string Dep_Id { get; set; }
        public string Dep_Descripcion { get; set; }
        [NotMapped]
        public string TotalEmpleados { get; set; }
        public int? Dep_Creacion { get; set; }
        public int? Dep_Modifica { get; set; }
        public DateTime Dep_Fecha_Creacion { get; set; }
        public DateTime? Dep_Fecha_Modifica { get; set; }
        public bool? Dep_Estado { get; set; }
    }
}
