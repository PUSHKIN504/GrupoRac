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
    public class VehiculoRepository : IRepositorio<tbVehiculos>
    {
        public RequestStatus Actualizar(tbVehiculos item)
        {
            using (var db = new SqlConnection(GrupoRacContext.ConnectionString))
            {
                //pendiente los parametros
                var parameter = new DynamicParameters();
                //parameter.Add("Dept_Id", item.Dep_Id);
                //parameter.Add("Dept_Descripcion", item.Dep_Descripcion);
                parameter.Add("@Veh_Placa", item.Veh_Placa);
                parameter.Add("@Mod_Id", item.Mod_Id);
                parameter.Add("@Sed_Id", item.Sed_Id);
                parameter.Add("@Com_Id", item.Com_Id);
                parameter.Add("@Com_Precio", item.Com_Precio);
                parameter.Add("@Veh_Modifica", item.Veh_Modifica);
                parameter.Add("@Veh_Fecha_Modifica", DateTime.Now);

                var result = db.Execute(ScriptBaseDatos.Vehiculo_Actualizar,
                    parameter,
                    commandType: CommandType.StoredProcedure
                    );
                string mensaje = (result > 0) ? "Exito" : "Eroor";
                return new RequestStatus { CodeStatus = result, MessageStatus = mensaje };
            }
        }

        public RequestStatus Eliminar(int? id)
        {
            throw new NotImplementedException();

        }
        public RequestStatus Elimina(string? id)
        {
            using (var db = new SqlConnection(GrupoRacContext.ConnectionString))
            {
                //pendiente los parametros
                var parameter = new DynamicParameters();

                parameter.Add("@Veh_Placa", id);

                var result = db.Execute(ScriptBaseDatos.Vehiculo_Eliminar,
                    parameter,
                    commandType: CommandType.StoredProcedure
                    );
                string mensaje = (result > 0) ? "Exito" : "Eroor";
                return new RequestStatus { CodeStatus = result, MessageStatus = mensaje };
            }
        }
        public RequestStatus Desactivar(tbVehiculos item)
        {
            using (var db = new SqlConnection(GrupoRacContext.ConnectionString))
            {
                //pendiente los parametros
                var parameter = new DynamicParameters();
                //parameter.Add("Dept_Id", item.Dep_Id);

                parameter.Add("@Veh_Placa", item.Veh_Placa);
                parameter.Add("@Veh_Modifica", item.Veh_Modifica);
                parameter.Add("@Veh_Fecha_Modifica", DateTime.Now);

                var result = db.Execute(ScriptBaseDatos.Vehiculo_Desactivar,
                    parameter,
                    commandType: CommandType.StoredProcedure
                    );
                string mensaje = (result > 0) ? "Exito" : "Error";
                return new RequestStatus { CodeStatus = result, MessageStatus = mensaje };
            }
        }

        public tbVehiculos find(int? id)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<tbVehiculos> findDetalle(int? Com_Id)
        {
            List<tbVehiculos> result = new List<tbVehiculos>();
            using (var db = new SqlConnection(GrupoRacContext.ConnectionString))
            {
                result = db.Query<tbVehiculos>(ScriptBaseDatos.Vehiculo_BuscarDetalle, new { Com_Id = Com_Id },commandType: CommandType.StoredProcedure).ToList();
                return result;
            }
        }

        public RequestStatus Insertar(tbVehiculos item)
        {
            using (var db = new SqlConnection(GrupoRacContext.ConnectionString))
            {
                //pendiente los parametros
                var parameter = new DynamicParameters();
                //parameter.Add("Dept_Id", item.Dep_Id);
                //parameter.Add("Dept_Descripcion", item.Dep_Descripcion);
                parameter.Add("@Veh_Placa", item.Veh_Placa);
                parameter.Add("@Mod_Id", item.Mod_Id);
                parameter.Add("@Sed_Id", item.Sed_Id);
                parameter.Add("@Com_Id", item.Com_Id);
                parameter.Add("@Com_Precio", item.Com_Precio);
                parameter.Add("@Veh_Creacion", item.Veh_Creacion);
                parameter.Add("@Veh_Fecha_Creacion", DateTime.Now);

                var result = db.Execute(ScriptBaseDatos.Vehiculo_Insertar,
                    parameter,
                    commandType: CommandType.StoredProcedure
                    );
                string mensaje = (result > 0) ? "Exito" : "Eroor";
                return new RequestStatus { CodeStatus = result, MessageStatus = mensaje };
            }
        }

        //public RequestStatus Insertar(tbVehiculos item)
        //{
        //    using (var db = new SqlConnection(GrupoRacContext.ConnectionString))
        //    {
        //        //pendiente los parametros
        //        var parameter = new DynamicParameters();
        //        //parameter.Add("Dept_Id", item.Dep_Id);
        //        //parameter.Add("Dept_Descripcion", item.Dep_Descripcion);
        //        parameter.Add("Dept_Usua_Creacion", 1);
        //        parameter.Add("Dept_Fecha_Creacion", DateTime.Now);

        //        var result = db.Execute(ScriptBaseDatos.Departamentos_Insetar,
        //            parameter,
        //            commandType: CommandType.StoredProcedure
        //            );
        //        string mensaje = (result == 1) ? "Exito" : "Eroor";
        //        return new RequestStatus { CodeStatus = result, MessageStatus = mensaje };
        //    }
        //}

        public IEnumerable<tbVehiculos> List()
        {
            List<tbVehiculos> result = new List<tbVehiculos>();
            using (var db = new SqlConnection(GrupoRacContext.ConnectionString))
            {
                result = db.Query<tbVehiculos>(ScriptBaseDatos.Vehiculo_Listar, commandType: CommandType.StoredProcedure).ToList();
                return result;
            }
        }
    }
}
