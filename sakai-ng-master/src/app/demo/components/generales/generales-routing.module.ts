import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { RoleGuard } from 'src/app/guards/role.guard';

const routes: Routes = [
  { path: 'departamentos', data: { breadcrumb: 'Departamentos' }, loadChildren: () => import('./Departamento/list-departamento/Departamentodemo.module').then(m => m.DepartamentoDemoModule), canActivate: [AuthGuard, RoleGuard] },
  { path: 'municipios', data: { breadcrumb: 'Municipios' }, loadChildren: () => import('./Municipio/list-municipio/Municipiodemo.module').then(m => m.MunicipioDemoModule), canActivate: [AuthGuard, RoleGuard] },
  { path: 'cargos', data: { breadcrumb: 'Cargos' }, loadChildren: () => import('./Cargo/list-cargo/Cargodemo.module').then(m => m.CargoDemoModule), canActivate: [AuthGuard, RoleGuard] },
  { path: 'clientes', data: { breadcrumb: 'Clientes' }, loadChildren: () => import('./Cliente/list-cliente/Clientedemo.module').then(m => m.ClienteDemoModule), canActivate: [AuthGuard, RoleGuard] },
  { path: 'empleados', data: { breadcrumb: 'Empleados' }, loadChildren: () => import('./Empleado/list-empleado/empleadodemo.module').then(m => m.EmpleadoDemoModule), canActivate: [AuthGuard, RoleGuard] },
  { path: 'estadosciviles', data: { breadcrumb: 'Estado Civil' }, loadChildren: () => import('./EstadoCivil/list-estadocivil/EstadoCivildemo.module').then(m => m.EstadoCivilDemoModule), canActivate: [AuthGuard, RoleGuard] },
  { path: 'marcas', data: { breadcrumb: 'Marca' }, loadChildren: () => import('./Marca/list-marca/marcademo.module').then(m => m.MarcaDemoModule), canActivate: [AuthGuard, RoleGuard] },
  { path: 'sedes', data: { breadcrumb: 'Sede' }, loadChildren: () => import('./Sede/list-sede/sededemo.module').then(m => m.SedeDemoModule), canActivate: [AuthGuard, RoleGuard] },
  { path: '**', redirectTo: '/notfound' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GeneraleRoutingModule { }
