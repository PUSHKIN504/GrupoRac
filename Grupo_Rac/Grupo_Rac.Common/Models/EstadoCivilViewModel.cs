using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Grupo_Rac.Common.Models
{
    public class EstadoCivilViewModel
    {
        public int Est_ID { get; set; }
        public string Est_Descripcion { get; set; }
        public int Est_UsuCre { get; set; }
        public int? Est_UsuModi { get; set; }
        public DateTime Est_Fecha_Creacion { get; set; }
        public DateTime? Est_Fecha_Modifica { get; set; }
        public bool Est_Estado { get; set; }
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
