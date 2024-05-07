using Microsoft.Extensions.DependencyInjection;
//using Grupo_Rac.BusinessLogic.Servicios;
using Grupo_Rac.DataAccess;
//using Grupo_Rac.DataAccess.Repositorio;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Grupo_Rac.DataAccess.Repositorio;
using Grupo_Rac.BusinessLogic.Servicios;

namespace Grupo_Rac.BusinessLogic
{
    public static class ServicioConfiguracion
    {
        public static void DataAcces(this IServiceCollection service, string conn)
        {
            service.AddScoped<RolRepositorio>();
            service.AddScoped<DepartamentoRepositorio>();
            service.AddScoped<CiudadReposity>();
            service.AddScoped<ClienteRepository>();
            service.AddScoped<EstadoCivilRepository>();
            service.AddScoped<MarcaRepository>();
            service.AddScoped<ModeloRepository>();
            service.AddScoped<SedeRepository>();
            service.AddScoped<UsuarioRepository>();
            service.AddScoped<CargoRepository>();
            service.AddScoped<VehiculoRepository>();
            service.AddScoped<CompRepository>();
            GrupoRacContext.BuildConnectionString(conn);

        }
        public static void BussinesLogic(this IServiceCollection service)
        {
            service.AddScoped<GeneralService>();
            service.AddScoped<AccesoService>();
            service.AddScoped<VentaService>();
            //service.AddScoped<ServiciosAcceso>();
            //service.AddScoped<ServicioRestaurantes>();
        }
    }
}
