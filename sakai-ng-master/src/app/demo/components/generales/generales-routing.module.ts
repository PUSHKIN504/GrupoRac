import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'departamento', data: { breadcrumb: 'Departamento' }, loadChildren: () => import('./Departamento/list-departamento/Departamentodemo.module').then(m => m.DepartamentoDemoModule) },
        { path: 'Municipio', data: { breadcrumb: 'Municipio' }, loadChildren: () => import('./Municipio/list-municipio/Municipiodemo.module').then(m => m.MunicipioDemoModule) },
        { path: 'Cargo', data: { breadcrumb: 'Cargo' }, loadChildren: () => import('./Cargo/list-cargo/Cargodemo.module').then(m => m.CargoDemoModule) },
        { path: 'Cliente', data: { breadcrumb: 'Cliente' }, loadChildren: () => import('./Cliente/list-cliente/Clientedemo.module').then(m => m.ClienteDemoModule) },
        { path: 'EstadoCivil', data: { breadcrumb: 'EstadoCivil' }, loadChildren: () => import('./EstadoCivil/list-estadocivil/EstadoCivildemo.module').then(m => m.EstadoCivilDemoModule) },
        { path: 'Marca', data: { breadcrumb: 'Marca' }, loadChildren: () => import('./Marca/list-marca/marcademo.module').then(m => m.MarcaDemoModule) },
        { path: 'Sede', data: { breadcrumb: 'Sede' }, loadChildren: () => import('./Sede/list-sede/sededemo.module').then(m => m.SedeDemoModule) },
        { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})
export class GeneraleRoutingModule { }