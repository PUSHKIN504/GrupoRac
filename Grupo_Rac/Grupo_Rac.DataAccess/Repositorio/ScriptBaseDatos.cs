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
        public static string Departamentos_Detalle = "[Gral].[SP_Departamentos_Llenar]";
        public static string Departamentos_Eliminar = "[Gral].[SP_Departamentos_Eliminar]";
        public static string Departamentos_Actualizar = "[Gral].[SP_Departamentos_Actualizar]";

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

        #region Compra
        public static string Compra_Listar = "[Vent].[SP_Compras_listar]";
        public static string Compra_Insertar = "[Vent].[SP_FactCompra_Insertar]";
        public static string Compra_Actualizar = "[Vent].[SP_Compra_Actualizar]";
        public static string Compra_Buscar = "[Vent].[SP_Compra_Buscar]";
        public static string Compra_Eliminar = "[Vent].[SP_Compra_Eliminar]";
        public static string Compra_Emitir = "[Vent].[SP_Compra_Emitir]";

        #endregion

        #region Vehiculo
        public static string Vehiculo_Listar = "[Vent].[sp_Vehiculos_listar]";
        public static string Vehiculo_Insertar = "[Vent].[SP_Vehiculo_Insertar]";
        public static string Vehiculo_Actualizar = "[Vent].[SP_Vehiculo_Actualizar]";
        public static string Vehiculo_BuscarDetalle = "[Vent].[SP_Vehiculo_BuscarDetalle]";
        public static string Vehiculo_Eliminar = "[Vent].[SP_Vehiculo_Eliminar]";
        public static string Vehiculo_Desactivar = "[Vent].[SP_Vehiculo_Desactivar]";


        #endregion
    }
}
