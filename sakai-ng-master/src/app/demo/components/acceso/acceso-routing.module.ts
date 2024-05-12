import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'rol', data: { breadcrumb: 'Rol' }, loadChildren: () => import('./Role/list-rol/roldemo.module').then(m => m.RolDemoModule) },
        //{ path: 'usuario', data: { breadcrumb: 'Usuario' }, loadChildren: () => import('./Usuario/list-usuario/usuariodemo.module').then(m => m.UsuarioDemoModule) },
        //{ path: 'login', data: { breadcrumb: 'Login' }, loadChildren: () => import('./login/login.module').then(m => m.LoginModule) },

        { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})
export class AccesoRoutingModule { }