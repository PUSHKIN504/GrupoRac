using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Grupo_Rac.Common.Models
{
    public class MarcaVehiculoDto
    {
        public string Marca { get; set; }
        public int Cantidad { get; set; }
    }

    public class MarcaViewModel
    {
        public int Mar_Id { get; set; }
        public string Mar_Descripcion { get; set; }
        public int? Mar_Creacion { get; set; }
        public int? Mar_Modifica { get; set; }
        public DateTime Mar_Fecha_Creacion { get; set; }
        public DateTime? Mar_Fecha_Modifica { get; set; }
        public bool? Mar_Estado { get; set; }
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
