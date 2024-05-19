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
        public static string DepartamentoListar = "Gral.sp_Departamentos_listar";
        public static string Departamentollenar = "Gral.sp_Departamentos_buscar";
        public static string DepartamentoActualizar = "Gral.sp_Departamentos_actualizar";
        public static string DepartamentoEliminar = "Gral.sp_Departamentos_eliminar";
        public static string Departamento_EmpleadoporDept = "[Gral].[sp_EmpleadosPorDepartamento]";
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

        #region Roles
        public static string PantallasRoles_ListaPorRol = "[Acce].[SP_PantallaPorRol_PorRol]";
        public static string RolesListar = "Acce.sp_Roles_listar";
        public static string Rolesllenar = "Acce.sp_Roles_buscar";
        public static string RolesActualizar = "Acce.sp_Roles_actualizar";
        public static string RolesEliminar = "Acce.sp_Roles_eliminar";

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
        #region RolesPorPantalla

        public static string PantallasRolesListar = "[Acce].[sp_PantallasRoles_listar]";
        public static string PantallasRolesllenar2 = "[Acce].[sp_Roles_buscar]";
        public static string PantallasRolesllenar = "[Acce].[sp_PantallasPorRol2_buscar]";
        public static string PantallasRolesActualizar = "[Acce].[sp_PantallasPorRoles_actualizar]";
        public static string PantallasRolesEliminar = "[Acce].[sp_PantallasPorRoles_eliminar]";

        #endregion

        #region cargo
        public static string CargosListar = "Gral.sp_Cargos_listar";
        public static string Cargosllenar = "Gral.sp_Cargos_buscar";
        public static string CargosActualizar = "Gral.sp_Cargos_actualizar";
        public static string CargosEliminar = "Gral.sp_Cargos_eliminar";
        public static string Cargo_EmpleadoporCargo = "[Gral].[sp_EmpleadosPorCargo]";
        #endregion

        #region EstadoCivil
        public static string EstadosCivilesListar = "Gral.sp_EstadosCiviles_listar";
        public static string EstadosCivilesllenar = "Gral.sp_EstadosCiviles_buscar";
        public static string EstadosCivilesActualizar = "Gral.sp_EstadosCiviles_actualizar";
        public static string EstadosCivilesEliminar = "Gral.sp_EstadosCiviles_eliminar";

        #endregion

        #region Municipio
        public static string MunicipioListar = "Gral.sp_Municipios_listar";
        public static string Municipiollenar = "Gral.sp_Municipios_buscar";
        public static string MunicipioActualizar = "Gral.sp_Municipios_actualizar";
        public static string MunicipioEliminar = "Gral.sp_Municipios_eliminar";
        #endregion

        #region Marca
        public static string MarcasListar = "Gral.sp_Marcas_listar";
        public static string Marcasllenar = "Gral.sp_Marcas_buscar";
        public static string MarcasActualizar = "Gral.sp_Marcas_actualizar";
        public static string MarcasEliminar = "Gral.sp_Marcas_eliminar";
        #endregion

        #region Modelo
        public static string Modelo_Popularidad = "[Gral].[sp_PopularidadMarcasYModelosVehiculo]";
        #endregion

        #region Sede
        public static string SucursalessListar = "Gral.sp_Sucursales_listar";
        public static string Sucursalesllenar = "Gral.sp_Sucursales_buscar";
        public static string SucursalesActualizar = "Gral.sp_Sucursales_actualizar";
        public static string SucursalesEliminar = "Gral.sp_Sucursales_eliminar";

        #endregion

        #region Cliente
        public static string ClientesListar = "Gral.sp_Clientes_listar";
        public static string Clientesllenar = "Gral.sp_Clientes_buscar";
        public static string ClientesActualizar = "Gral.sp_Clientes_actualizar";
        public static string ClientesEliminar = "Gral.sp_Clientes_eliminar";
        public static string Cliente_TotalCompras = "[Vent].[sp_TotalComprasPorCliente]";
        #endregion

        #region Empleado
        public static string EmpleadosListar = "Gral.sp_Empleados_listar";
        public static string Empleadosllenar = "Gral.sp_Empleados_buscar";
        public static string EmpleadosActualizar = "Gral.sp_Empleados_actualizar";
        public static string EmpleadosEliminar = "Gral.sp_Empleados_eliminar";
        #endregion




    }
}
