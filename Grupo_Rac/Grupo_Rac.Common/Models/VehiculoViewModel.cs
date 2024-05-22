using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Grupo_Rac.Common.Models
{
    public class VehiculoViewModel
    {
        public string Veh_Placa { get; set; }
        public int? Mod_Id { get; set; }
        [NotMapped]
        public string Mod_Descripcion { get; set; }

        public int? Sed_Id { get; set; }
        public int? Com_Id { get; set; }
        public decimal? Com_Precio { get; set; }
        public int? Veh_Creacion { get; set; }
        public int? Veh_Modifica { get; set; }
        public DateTime? Veh_Fecha_Creacion { get; set; }
        public DateTime? Veh_Fecha_Modifica { get; set; }
        public bool? Veh_Estado { get; set; }
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
