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
    public class RolRepositorio : IRepositorio<tbRoles>
    {
        public RequestStatus Actualizar(tbRoles item)
        {
            throw new NotImplementedException();
        }

        public RequestStatus Eliminar(int? id)
        {
            throw new NotImplementedException();
        }

        public tbRoles find(int? id)
        {
            throw new NotImplementedException();
        }

        public RequestStatus Insertar(tbRoles item)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<tbRoles> List()
        {
            List<tbRoles> result = new List<tbRoles>();
            using (var db = new SqlConnection(GrupoRacContext.ConnectionString))
            {
                result = db.Query<tbRoles>(ScriptBaseDatos.Roles_Mostrar, commandType: CommandType.Text).ToList();
                return result;
            }
        }
    }
}
