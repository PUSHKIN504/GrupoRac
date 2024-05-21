import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard'; // Ajusta la ruta según sea necesario
import { RoleGuard } from 'src/app/guards/role.guard'; // Ajusta la ruta según sea necesario

const routes: Routes = [
    { path: 'roles', data: { breadcrumb: 'Roles' }, loadChildren: () => import('./Role/list-rol/roldemo.module').then(m => m.RolDemoModule), canActivate: [AuthGuard, RoleGuard] },
    // { path: 'usuario', data: { breadcrumb: 'Usuario' }, loadChildren: () => import('./Usuario/list-usuario/usuariodemo.module').then(m => m.UsuarioDemoModule), canActivate: [AuthGuard, RoleGuard] },
    // { path: 'login', data: { breadcrumb: 'Login' }, loadChildren: () => import('./login/login.module').then(m => m.LoginModule) },

    { path: '**', redirectTo: '/notfound' }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AccesoRoutingModule { }
