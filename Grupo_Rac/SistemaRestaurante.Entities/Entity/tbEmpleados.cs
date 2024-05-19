﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

#nullable disable

namespace Grupo_Rac.Entities.Entity
{
    public partial class tbEmpleados
    {
        public tbEmpleados()
        {
            tbUsuarios = new HashSet<tbUsuarios>();
        }

        [NotMapped]
        public string Dep_Id { get; set; }
        [NotMapped]
        public string Dep_Descripcion { get; set; }
        [NotMapped]
        public string Ciu_Descripcion { get; set; }
        [NotMapped]
        public string Est_Descripcion { get; set; }
        [NotMapped]
        public string Crg_Descripcion { get; set; }
        [NotMapped]
        public string Empl_Correo { get; set; }
        public int Empl_Id { get; set; }
        public string Empl_Nombre { get; set; }
        public string Empl_Apellido { get; set; }
        public string Empl_Sexo { get; set; }
        public DateTime Empl_FechaNac { get; set; }
        public string Ciu_Id { get; set; }
        public int Est_ID { get; set; }
        public int Carg_Id { get; set; }
        public int? Empl_UsuarioCreacion { get; set; }
        public DateTime? Empl_FechaCreacion { get; set; }
        public int? Empl_UsuarioModificacion { get; set; }
        public DateTime? Empl_FechaModificacion { get; set; }
        public bool? Empl_Estado { get; set; }
        public string Empl_DNI { get; set; }

        public virtual tbCargos Carg { get; set; }
        public virtual tbCiudades Ciu { get; set; }
        public virtual tbUsuarios Empl_UsuarioCreacionNavigation { get; set; }
        public virtual tbUsuarios Empl_UsuarioModificacionNavigation { get; set; }
        public virtual tbEstadosCiviles Est { get; set; }
        public virtual ICollection<tbUsuarios> tbUsuarios { get; set; }

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