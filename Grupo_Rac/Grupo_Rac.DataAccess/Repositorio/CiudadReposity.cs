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

    public class CiudadReposity : IRepositorio<tbCiudades>
    {
        public RequestStatus Insert(tbCiudades item)
        {
            const string sql = "Gral.sp_Municipios_insertar";



            using (var db = new SqlConnection(GrupoRacContext.ConnectionString))
            {
                var parametro = new DynamicParameters();
                parametro.Add("@Ciu_Id", item.Ciu_Id);
                parametro.Add("@Ciu_Descripcion", item.Ciu_Descripcion);

                parametro.Add("@Dep_Id", item.Dep_Id);
                parametro.Add("@Ciu_Creacion", item.Ciu_Creacion);
                parametro.Add("@Ciu_Fecha_Creacion", item.Ciu_Fecha_Creacion);


                var result = db.Execute(sql, parametro, commandType: CommandType.StoredProcedure);
                string mensaje = (result == 1) ? "Exito" : "Error";
                return new RequestStatus { CodeStatus = result, MessageStatus = mensaje };
            }
        }

        public IEnumerable<tbCiudades> List()
        {
            const string sql = "Gral.sp_Municipios_listar";

            List<tbCiudades> result = new List<tbCiudades>();

            using (var db = new SqlConnection(GrupoRacContext.ConnectionString))
            {
                result = db.Query<tbCiudades>(sql, commandType: CommandType.Text).ToList();

                return result;
            }
        }

        public IEnumerable<tbCiudades> Lista(string id)
        {
            const string sql = "[Gral].[sp_Municipios_MostrarPorDepartamento]";

            List<tbCiudades> result = new List<tbCiudades>();

            using (var db = new SqlConnection(GrupoRacContext.ConnectionString))
            {
                var parameter = new DynamicParameters();
                parameter.Add("Ciu_Id", id);
                result = db.Query<tbCiudades>(sql, parameter, commandType: CommandType.StoredProcedure).ToList();

                return result;
            }
        }


        public tbCiudades Fill(string id)
        {

            tbCiudades result = new tbCiudades();
            using (var db = new SqlConnection(GrupoRacContext.ConnectionString))
            {
                var parameter = new DynamicParameters();
                parameter.Add("Ciu_Id", id);
                result = db.QueryFirst<tbCiudades>(ScriptBaseDatos.Municipiollenar, parameter, commandType: CommandType.StoredProcedure);
                return result;
            }

        }

        public RequestStatus Update(tbCiudades item)
        {
            string sql = ScriptBaseDatos.MunicipioActualizar;

            using (var db = new SqlConnection(GrupoRacContext.ConnectionString))
            {
                var parameter = new DynamicParameters();
                parameter.Add("@Ciu_Id", item.Ciu_Id);
                parameter.Add("@Ciu_Descripcion", item.Ciu_Descripcion);
                parameter.Add("@Dep_Id", item.Dep_Id);
                parameter.Add("@Ciu_Modifica", item.Ciu_Modifica);
                parameter.Add("@Ciu_Fecha_Modifica", item.Ciu_Fecha_Modifica);

                var result = db.Execute(sql, parameter, commandType: CommandType.StoredProcedure);
                string mensaje = (result == 1) ? "exito" : "error";
                return new RequestStatus { CodeStatus = result, MessageStatus = mensaje };

            }
        }
        public RequestStatus Delete(string Muni_Codigo)
        {
            using (var db = new SqlConnection(GrupoRacContext.ConnectionString))
            {
                var parameter = new DynamicParameters();
                parameter.Add("Ciu_Id", Muni_Codigo);

                var result = db.QueryFirst(ScriptBaseDatos.MunicipioEliminar, parameter, commandType: CommandType.StoredProcedure);
                return new RequestStatus { CodeStatus = result.Resultado, MessageStatus = (result.Resultado == 1) ? "Exito" : "Error" };
            }
        }

        IEnumerable<tbCiudades> IRepositorio<tbCiudades>.List()
        {
            throw new NotImplementedException();
        }

        public RequestStatus Insertar(tbCiudades item)
        {
            throw new NotImplementedException();
        }

        public RequestStatus Actualizar(tbCiudades item)
        {
            throw new NotImplementedException();
        }

        public RequestStatus Eliminar(int? id)
        {
            throw new NotImplementedException();
        }

        public tbCiudades find(int? id)
        {
            throw new NotImplementedException();
        }
    }
}
