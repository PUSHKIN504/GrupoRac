import { NgModule } from '@angular/core';
import {RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { RoleGuard } from 'src/app/guards/role.guard';

const routes: Routes = [
    { path: 'facturaCompra', data: { breadcrumb: 'facturaCompra' }, loadChildren: () => import('./compra/facturacompra.module').then(m => m.FacturaCompraModule), canActivate: [AuthGuard, RoleGuard] },
    { path: 'facturaVenta', data: { breadcrumb: 'facturaVenta' }, loadChildren: () => import('./venta/facturaventa.module').then(m => m.FacturaVentaModule), canActivate: [AuthGuard, RoleGuard] },
   
    { path: '**', redirectTo: '/notfound' }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })

export class FacturaRoutingModule { }
