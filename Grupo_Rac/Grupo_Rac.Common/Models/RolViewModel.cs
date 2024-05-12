using Grupo_Rac.Entities.Entity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Grupo_Rac.Common.Models
{
    public class RolViewModel
    {
        public int Rol_Id { get; set; }
        public string Rol_Descripcion { get; set; }
        public int? Rol_Creacion { get; set; }
        public DateTime? Rol_FechaCreacion { get; set; }
        public int? Rol_Modifica { get; set; }
        public DateTime? Rol_FechaModificacion { get; set; }
        public bool? Rol_Estado { get; set; }
        [NotMapped]
        public string UsuarioCreacion { get; set; }

        [NotMapped]
        public string UsuarioModificacion { get; set; }

        [NotMapped]
        public List<tbPantallas> pantallas { get; set; }

        [NotMapped]
        public List<int> PantallasID { get; set; }
    }
}
