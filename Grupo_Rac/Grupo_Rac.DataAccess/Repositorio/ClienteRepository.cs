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
    public class ClienteRepository : IRepositorio<tbClientes>
    {
        public RequestStatus Insert(tbClientes item)
        {
            const string sql = "[Gral].[sp_Clientes_insertar]";

            using (var db = new SqlConnection(GrupoRacContext.ConnectionString))
            {
                var parametro = new DynamicParameters();

                parametro.Add("@Clie_Nombre", item.Cli_Nombre);
                parametro.Add("@Clie_Apellido", item.Cli_Apellido);
                parametro.Add("@Clie_FechaNac", item.Cli_FechaNac);
                parametro.Add("@Clie_Sexo", item.Cli_Sexo);
                parametro.Add("@Muni_Codigo", item.Ciu_Id);
                parametro.Add("@Esta_Id", item.Est_ID);
                parametro.Add("@Clie_UsuarioCreacion", 1);
                parametro.Add("@Clie_FechaCreacion", item.Cli_Fecha_Creacion);
                parametro.Add("@Clie_DNI", item.Cli_DNI);


                var result = db.Execute(sql, parametro, commandType: CommandType.StoredProcedure);
                string mensaje = (result == 1) ? "Exito" : "Error";
                return new RequestStatus { CodeStatus = result, MessageStatus = mensaje };
            }
        }

        public IEnumerable<tbClientes> List()
        {
            const string sql = "[Gral].[sp_Clientes_listar]";

            List<tbClientes> result = new List<tbClientes>();

            using (var db = new SqlConnection(GrupoRacContext.ConnectionString))
            {
                result = db.Query<tbClientes>(sql, commandType: CommandType.Text).ToList();

                return result;
            }
        }

        public IEnumerable<tbClientes> Totalcompras(int sucursal, string inicio, string fin)
        {
            List<tbClientes> result = new List<tbClientes>();
            using (var db = new SqlConnection(GrupoRacContext.ConnectionString))
            {
                var parameters = new { Sed_Id = sucursal, FiltroSucursal = 1, FechaInicio = inicio, FechaFin = fin };
                result = db.Query<tbClientes>(ScriptBaseDatos.Cliente_TotalCompras, parameters, commandType: CommandType.StoredProcedure).ToList();
                return result;
            }
        }

        public IEnumerable<tbClientes> Todasss(string inicio, string fin)
        {
            List<tbClientes> result = new List<tbClientes>();
            using (var db = new SqlConnection(GrupoRacContext.ConnectionString))
            {
                var parameters = new { FiltroSucursal = 0, FechaInicio = inicio, FechaFin = fin };
                result = db.Query<tbClientes>(ScriptBaseDatos.Cliente_TotalCompras, parameters, commandType: CommandType.StoredProcedure).ToList();
                return result;
            }
        }
        public tbClientes Fill(int id)
        {

            tbClientes result = new tbClientes();
            using (var db = new SqlConnection(GrupoRacContext.ConnectionString))
            {
                var parameter = new DynamicParameters();
                parameter.Add("Clie_Id", id);
                result = db.QueryFirst<tbClientes>(ScriptBaseDatos.Clientesllenar, parameter, commandType: CommandType.StoredProcedure);
                return result;
            }

        }

        public RequestStatus Update(tbClientes item)
        {
            string sql = ScriptBaseDatos.ClientesActualizar;

            using (var db = new SqlConnection(GrupoRacContext.ConnectionString))
            {
                var parameter = new DynamicParameters();
                parameter.Add("@Clie_Id", item.Cli_Id);
                parameter.Add("@Clie_Nombre", item.Cli_Nombre);
                parameter.Add("@Clie_Apellido", item.Cli_Apellido);
                parameter.Add("@Clie_FechaNac", item.Cli_FechaNac);
                parameter.Add("@Clie_Sexo", item.Cli_Sexo);
                parameter.Add("@Muni_Codigo", item.Ciu_Id);
                parameter.Add("@Esta_Id", item.Est_ID);
                parameter.Add("@Clie_DNI", item.Cli_DNI);
                parameter.Add("@Clie_UsuarioModificacion", 1);
                parameter.Add("@Clie_FechaModificacion", item.Cli_Fecha_Modifica);
                var result = db.Execute(sql, parameter, commandType: CommandType.StoredProcedure);
                string mensaje = (result == 1) ? "exito" : "error";
                return new RequestStatus { CodeStatus = result, MessageStatus = mensaje };

            }
        }



        public RequestStatus Delete(int Clie_Id)
        {
            using (var db = new SqlConnection(GrupoRacContext.ConnectionString))
            {
                var parameter = new DynamicParameters();
                parameter.Add("Clie_Id", Clie_Id);

                var result = db.QueryFirst(ScriptBaseDatos.ClientesEliminar, parameter, commandType: CommandType.StoredProcedure);
                return new RequestStatus { CodeStatus = result.Resultado, MessageStatus = (result.Resultado == 1) ? "Exito" : "Error" };
            }
        }

        public RequestStatus Insertar(tbClientes item)
        {
            throw new NotImplementedException();
        }

        public RequestStatus Actualizar(tbClientes item)
        {
            throw new NotImplementedException();
        }

        public RequestStatus Eliminar(int? id)
        {
            throw new NotImplementedException();
        }

        public tbClientes find(int? id)
        {
            throw new NotImplementedException();
        }
    }
}
