﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

#nullable disable

namespace Grupo_Rac.Entities.Entity
{
    public partial class tbPantallas_PorRoles
    {
        public int PaR_Id { get; set; }
        public int? Ptl_Id { get; set; }
        public int? Rol_Id { get; set; }
        [NotMapped]
        public string Ptl_Descripcion { get; set; }
        public int? PaR_Creacion { get; set; }
        public DateTime? PaR_FechaCreacion { get; set; }
        public int? PaR_Modifica { get; set; }
        public DateTime? PaR_FechaModificacion { get; set; }
        public bool? PaR_Estado { get; set; }
        [NotMapped]
        public string UsuarioCreacion { get; set; }

        [NotMapped]
        public string UsuarioModificacion { get; set; }

        [NotMapped]
        public string Role_Rol { get; set; }

        public virtual tbUsuarios PaR_CreacionNavigation { get; set; }
        public virtual tbUsuarios PaR_ModificaNavigation { get; set; }
        public virtual tbPantallas Ptl { get; set; }
        public virtual tbRoles Rol { get; set; }
    }
}