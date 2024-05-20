import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'reporteCompra', loadChildren: () => import('./compra/reportcompra.module').then(m => m.ReporteCompraModule) },
        { path: 'reporteVenta', loadChildren: () => import('./venta/reportventa.module').then(m => m.ReporteVentaModule) },
        { path: 'reporteCliente', loadChildren: () => import('./cliente/reportcliente.module').then(m => m.ReporteClienteModule) },
        { path: 'reporteEmpleado', loadChildren: () => import('./empleado/reportempleado.module').then(m => m.ReporteEmpleadoModule) },
        { path: 'reporteVehiculo', loadChildren: () => import('./vehiculo/reportvehiculo.module').then(m => m.ReporteVehiculoModule) },

        { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})
export class ReporteRoutingModule { }
