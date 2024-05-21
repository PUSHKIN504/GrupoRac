import { NgModule } from '@angular/core';
import {RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { RoleGuard } from 'src/app/guards/role.guard';

const routes: Routes = [
    { path: 'reporteCompra', data: { breadcrumb: 'reporteCompra' }, loadChildren: () => import('./compra/reportcompra.module').then(m => m.ReporteCompraModule), canActivate: [AuthGuard, RoleGuard] },
    { path: 'reporteVenta', data: { breadcrumb: 'reporteVenta' }, loadChildren: () => import('./venta/reportventa.module').then(m => m.ReporteVentaModule), canActivate: [AuthGuard, RoleGuard] },
    { path: 'reporteCliente', data: { breadcrumb: 'reporteCliente' }, loadChildren: () => import('./cliente/reportcliente.module').then(m => m.ReporteClienteModule), canActivate: [AuthGuard, RoleGuard] },
    { path: 'reporteEmpleado', data: { breadcrumb: 'reporteEmpleado' }, loadChildren: () => import('./empleado/reportempleado.module').then(m => m.ReporteEmpleadoModule), canActivate: [AuthGuard, RoleGuard] },
    { path: 'reporteVehiculo', data: { breadcrumb: 'DreporteVehiculo' }, loadChildren: () => import('./vehiculo/reportvehiculo.module').then(m => m.ReporteVehiculoModule), canActivate: [AuthGuard, RoleGuard] },

    { path: '**', redirectTo: '/notfound' }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })

export class ReporteRoutingModule { }
