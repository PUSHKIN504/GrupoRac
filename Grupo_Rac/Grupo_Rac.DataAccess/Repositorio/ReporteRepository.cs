using Dapper;
using Grupo_Rac.Entities.Entity;
using Microsoft.Data.SqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Grupo_Rac.DataAccess.Repositorio
{
    public class ReporteRepository
    {
        public IEnumerable<tbCompras> reporteCompras(string? month, string? year)
        {
            List<tbCompras> result = new List<tbCompras>();
            using (var db = new SqlConnection(GrupoRacContext.ConnectionString))
            {
                var parameter = new DynamicParameters();
                //parameter.Add("Dept_Id", item.Dep_Id);

                parameter.Add("@Month", month);
                parameter.Add("@YEAR", year);

                result = db.Query<tbCompras>(ScriptBaseDatos.ReporteComprasPorMes, parameter,commandType: CommandType.StoredProcedure).ToList();

                return result;
            }
        }

        public IEnumerable<tbVentasEnc> reporteVentas(string? month, string? year, int? Sed_Id)
        {
            List<tbVentasEnc> result = new List<tbVentasEnc>();
            using (var db = new SqlConnection(GrupoRacContext.ConnectionString))
            {
                var parameter = new DynamicParameters();
                //parameter.Add("Dept_Id", item.Dep_Id);

                parameter.Add("@Month", month);
                parameter.Add("@YEAR", year);
                parameter.Add("@Sed_Id", Sed_Id);

                result = db.Query<tbVentasEnc>(ScriptBaseDatos.ReporteVentasPorMes, parameter, commandType: CommandType.StoredProcedure).ToList();

                return result;
            }
        }

        public IEnumerable<tbClientes> reporteClientes(int? Ciu_Id)
        {
            List<tbClientes> result = new List<tbClientes>();
            using (var db = new SqlConnection(GrupoRacContext.ConnectionString))
            {
                var parameter = new DynamicParameters();
                //parameter.Add("Dept_Id", item.Dep_Id);

                parameter.Add("@Ciu_Id", Ciu_Id);

                result = db.Query<tbClientes>(ScriptBaseDatos.ReporteClientesInfo, parameter, commandType: CommandType.StoredProcedure).ToList();

                return result;
            }
        }

        public IEnumerable<tbEmpleados> reporteEmpleados()
        {
            List<tbEmpleados> result = new List<tbEmpleados>();
            using (var db = new SqlConnection(GrupoRacContext.ConnectionString))
            {
               

                result = db.Query<tbEmpleados>(ScriptBaseDatos.ReporteEmpleadosInfo, commandType: CommandType.StoredProcedure).ToList();

                return result;
            }
        }
        public IEnumerable<tbVehiculos> reporteVehiculos()
        {
            List<tbVehiculos> result = new List<tbVehiculos>();
            using (var db = new SqlConnection(GrupoRacContext.ConnectionString))
            {

                result = db.Query<tbVehiculos>(ScriptBaseDatos.ReporteVehiculosInventario, commandType: CommandType.StoredProcedure).ToList();

                return result;
            }
        }
    }
}
