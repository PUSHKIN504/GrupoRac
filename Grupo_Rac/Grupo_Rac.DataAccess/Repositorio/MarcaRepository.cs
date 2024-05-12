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
    public class MarcaRepository : IRepositorio<tbMarcas>
    {
        public RequestStatus Insert(tbMarcas item)
        {
            const string sql = "[Gral].[sp_Marcas_insertar]";

            using (var db = new SqlConnection(GrupoRacContext.ConnectionString))
            {
                var parametro = new DynamicParameters();
                parametro.Add("@Mar_Descripcion", item.Mar_Descripcion);
                parametro.Add("@Mar_Creacion", 1);
                parametro.Add("@Mar_Fecha_Creacion", item.Mar_Fecha_Creacion);


                var result = db.Execute(sql, parametro, commandType: CommandType.StoredProcedure);
                string mensaje = (result == 1) ? "Exito" : "Error";
                return new RequestStatus { CodeStatus = result, MessageStatus = mensaje };
            }
        }

        public IEnumerable<tbMarcas> List()
        {
            const string sql = "[Gral].[sp_Marcas_listar]";

            List<tbMarcas> result = new List<tbMarcas>();

            using (var db = new SqlConnection(GrupoRacContext.ConnectionString))
            {
                result = db.Query<tbMarcas>(sql, commandType: CommandType.Text).ToList();

                return result;
            }
        }

        public tbMarcas Fill(int id)
        {

            tbMarcas result = new tbMarcas();
            using (var db = new SqlConnection(GrupoRacContext.ConnectionString))
            {
                var parameter = new DynamicParameters();
                parameter.Add("Mar_Id", id);
                result = db.QueryFirst<tbMarcas>(ScriptBaseDatos.Marcasllenar, parameter, commandType: CommandType.StoredProcedure);
                return result;
            }

        }

        public RequestStatus Update(tbMarcas item)
        {
            string sql = ScriptBaseDatos.MarcasActualizar;

            using (var db = new SqlConnection(GrupoRacContext.ConnectionString))
            {
                var parameter = new DynamicParameters();
                parameter.Add("@Mar_Id", item.Mar_Id);
                parameter.Add("@Mar_Descripcion", item.Mar_Descripcion);
                parameter.Add("@Mar_Modifica", item.Mar_Modifica);
                parameter.Add("@Mar_Fecha_Modifica", item.Mar_Fecha_Modifica);

                var result = db.Execute(sql, parameter, commandType: CommandType.StoredProcedure);
                string mensaje = (result == 1) ? "exito" : "error";
                return new RequestStatus { CodeStatus = result, MessageStatus = mensaje };

            }
        }
        public RequestStatus Delete(string Marc_Id)
        {
            using (var db = new SqlConnection(GrupoRacContext.ConnectionString))
            {
                var parameter = new DynamicParameters();
                parameter.Add("Mar_Id", Marc_Id);

                var result = db.QueryFirst(ScriptBaseDatos.MarcasEliminar, parameter, commandType: CommandType.StoredProcedure);
                return new RequestStatus { CodeStatus = result.Resultado, MessageStatus = (result.Resultado == 1) ? "Exito" : "Error" };
            }
        }

        public RequestStatus Insertar(tbMarcas item)
        {
            throw new NotImplementedException();
        }

        public RequestStatus Actualizar(tbMarcas item)
        {
            throw new NotImplementedException();
        }

        public RequestStatus Eliminar(int? id)
        {
            throw new NotImplementedException();
        }

        public tbMarcas find(int? id)
        {
            throw new NotImplementedException();
        }
    }
}
