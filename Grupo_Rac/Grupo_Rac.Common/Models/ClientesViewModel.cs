using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Grupo_Rac.Common.Models
{
    public class ClientesViewModel
    {
        public int Cli_Id { get; set; }
        public string Cli_Nombre { get; set; }
        public string Cli_Apellido { get; set; }
        [NotMapped]
        public string NombreCompleto { get; set; } 
        [NotMapped]
        public string TotalGastado { get; set; }
        public DateTime Cli_FechaNac { get; set; }
        public string Cli_Sexo { get; set; }
        public int Est_ID { get; set; }
        public string Cli_DNI { get; set; }
        public string Ciu_Id { get; set; }
        public string Cli_Direccion { get; set; }
        public int? Cli_Creacion { get; set; }
        public int? Cli_Modifica { get; set; }
        public DateTime? Cli_Fecha_Creacion { get; set; }
        public DateTime? Cli_Fecha_Modifica { get; set; }
        public bool? Cli_Estado { get; set; }

        [NotMapped]
        public string UsuarioCreacion { get; set; }

        [NotMapped]
        public string UsuarioModificacion { get; set; }

        [NotMapped]
        public string Ciu_Descripcion { get; set; }
        [NotMapped]
        public string Est_Descripcion { get; set; }
        [NotMapped]
        public string Clie_Sexo { get; set; }


    }
}
