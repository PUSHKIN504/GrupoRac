using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Grupo_Rac.API.Clases
{
    public class FormData
    {
        public int Rol_Id { get; set; }
        [Required(ErrorMessage = "El Campo {0} es requerido")]

        public string txtRol { get; set; }
        public List<int> pantallasSeleccionadas { get; set; }
    }
}
