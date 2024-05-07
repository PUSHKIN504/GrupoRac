using AutoMapper;
using Grupo_Rac.Common.Models;
using Grupo_Rac.Entities.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Grupo_Rac.API.Extensiones
{
    public class MappingProfileExtensions : Profile
    {
        public MappingProfileExtensions()
        {
            CreateMap<DepartamentoViewModel, tbDepartamento>().ReverseMap();
            CreateMap<UsuarioViewModel, tbUsuarios>().ReverseMap();
            CreateMap<RolViewModel, tbRoles>().ReverseMap();
            CreateMap<MarcaViewModel, tbMarcas>();
            CreateMap<ModeloViewModel, tbModelos>();
            CreateMap<CompViewModel, tbCompras>();
        }
    }
}
