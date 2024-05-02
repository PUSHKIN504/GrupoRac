using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Grupo_Rac.DataAccess.Repositorio
{
    public class ScriptBaseDatos
    {
        #region Departamento
        public static string Departamentos_Mostrar = "[Gral].[SP_Departamentos_Mostrar]";
        public static string Departamentos_Insetar = "[Gral].[SP_Departamentos_Insertar]";
        #endregion

        #region Usuario
        public static string Usuarios_Mostrar = "Acce.SP_Usuarios_Mostrar";
        public static string Usuarios_Codigo = "Acce.SP_AgregarCodigoVerificacion";
        public static string Usuarios_Insertar = "[Acce].[SP_Usuarios_Insertar]";
        public static string Usuarios_ValidarReestablecer = "Acce.SP_ValidarCorreo";
        public static string Usuarios_Reestablecer = "[Acce].[SP_tbUsuariosReestablecer]";
        public static string Usuarios_Eliminar = "[Acce].[SP_Usuarios_Eliminar]";
        public static string Usuarios_Actualizar = "[Acce].[SP_Usuarios_Actualizar]";
        public static string Usuario_MostrarCodigo = "Acce.SP_MostrarCodigoVerificacion";
        public static string Usuario_Login = "[Acce].[SP_Usuarios_InicioSesion]";
        public static string Usuario_Detalles = "[Acce].[SP_Usuarios_Detalles]";
        #endregion

        #region Rol
        public static string Roles_Mostrar = "[Acce].[SP_Rol_Mostrar]";

        #endregion
    }
}
