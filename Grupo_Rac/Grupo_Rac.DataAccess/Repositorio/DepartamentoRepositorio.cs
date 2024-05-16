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
    public class DepartamentoRepositorio : IRepositorio<tbDepartamento>
    {
        public RequestStatus Insert(tbDepartamento item)
        {
            const string sql = "[Gral].[sp_Departamentos_insertar]";



            using (var db = new SqlConnection(GrupoRacContext.ConnectionString))
            {
                var parametro = new DynamicParameters();
                parametro.Add("@Dep_Id", item.Dep_Id);
                parametro.Add("@Dep_Descripcion", item.Dep_Descripcion);
                parametro.Add("@Dep_Creacion", item.Dep_Creacion);
                parametro.Add("@Dep_Fecha_Creacion", item.Dep_Fecha_Creacion);


                var result = db.Execute(sql, parametro, commandType: CommandType.StoredProcedure);
                string mensaje = (result == 1) ? "Exito" : "Error";
                return new RequestStatus { CodeStatus = result, MessageStatus = mensaje };
            }
        }

        public IEnumerable<tbDepartamento> List()
        {
            const string sql = "Gral.sp_Departamentos_listar";

            List<tbDepartamento> result = new List<tbDepartamento>();

            using (var db = new SqlConnection(GrupoRacContext.ConnectionString))
            {
                result = db.Query<tbDepartamento>(sql, commandType: CommandType.Text).ToList();

                return result;
            }
        }

        public IEnumerable<tbDepartamento> Empledept(int sucursal, string inicio, string fin)
        {
            List<tbDepartamento> result = new List<tbDepartamento>();
            using (var db = new SqlConnection(GrupoRacContext.ConnectionString))
            {
                var parameters = new { Sed_Id = sucursal, FiltroSucursal = 1, FechaInicio = inicio, FechaFin = fin };
                result = db.Query<tbDepartamento>(ScriptBaseDatos.Departamento_EmpleadoporDept, parameters, commandType: CommandType.StoredProcedure).ToList();
                return result;
            }
        }

        public IEnumerable<tbDepartamento> Todas(string inicio, string fin)
        {
            List<tbDepartamento> result = new List<tbDepartamento>();
            using (var db = new SqlConnection(GrupoRacContext.ConnectionString))
            {
                var parameters = new { FiltroSucursal = 0, FechaInicio = inicio, FechaFin = fin };
                result = db.Query<tbDepartamento>(ScriptBaseDatos.Departamento_EmpleadoporDept, parameters, commandType: CommandType.StoredProcedure).ToList();
                return result;
            }
        }

        public tbDepartamento Fill(string id)
        {

            tbDepartamento result = new tbDepartamento();
            using (var db = new SqlConnection(GrupoRacContext.ConnectionString))
            {
                var parameter = new DynamicParameters();
                parameter.Add("Dep_Id", id);
                result = db.QueryFirst<tbDepartamento>(ScriptBaseDatos.Departamentollenar, parameter, commandType: CommandType.StoredProcedure);
                return result;
            }

        }

        public RequestStatus Update(tbDepartamento item)
        {
            string sql = ScriptBaseDatos.DepartamentoActualizar;

            using (var db = new SqlConnection(GrupoRacContext.ConnectionString))
            {
                var parameter = new DynamicParameters();
                parameter.Add("@Dep_Id", item.Dep_Id);
                parameter.Add("@Dep_Descripcion", item.Dep_Descripcion);
                parameter.Add("@Dep_Modifica", item.Dep_Modifica);
                parameter.Add("@Dep_Fecha_Modifica", item.Dep_Fecha_Modifica);

                var result = db.Execute(sql, parameter, commandType: CommandType.StoredProcedure);
                string mensaje = (result == 1) ? "exito" : "error";
                return new RequestStatus { CodeStatus = result, MessageStatus = mensaje };

            }
        }
        public RequestStatus Delete(string Depa_Codigo)
        {
            using (var db = new SqlConnection(GrupoRacContext.ConnectionString))
            {
                var parameter = new DynamicParameters();
                parameter.Add("Dep_Id", Depa_Codigo);

                var result = db.QueryFirst(ScriptBaseDatos.DepartamentoEliminar, parameter, commandType: CommandType.StoredProcedure);
                return new RequestStatus { CodeStatus = result.Resultado, MessageStatus = (result.Resultado == 1) ? "Exito" : "Error" };
            }
        }

        IEnumerable<tbDepartamento> IRepositorio<tbDepartamento>.List()
        {
            throw new NotImplementedException();
        }

        public RequestStatus Insertar(tbDepartamento item)
        {
            throw new NotImplementedException();
        }

        public RequestStatus Actualizar(tbDepartamento item)
        {
            throw new NotImplementedException();
        }

        public RequestStatus Eliminar(int? id)
        {
            throw new NotImplementedException();
        }

        public tbDepartamento find(int? id)
        {
            throw new NotImplementedException();
        }
    }
}
