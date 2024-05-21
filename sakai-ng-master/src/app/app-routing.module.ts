import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { AppLayoutComponent } from './layout/app.layout.component';
import { LoginComponent } from './demo/components/auth/login/login.component';
import { ReestablecerComponent } from './demo/components/auth/reestablecer/reestablecer.component';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';

const routes: Routes = [
    { 
        path: '', 
        redirectTo: '/login', 
        pathMatch: 'full' 
    },
    { 
        path: 'login', 
        component: LoginComponent  // Ruta para el componente de Login
    },
    { 
        path: 'reestablecer', 
        component: ReestablecerComponent  // Ruta para el componente de Login
    },
    {
        path: 'app',
        component: AppLayoutComponent,
        canActivate: [AuthGuard],
        children: [
            { path: 'dashboard', loadChildren: () => import('./demo/components/dashboard/dashboard.module').then(m => m.DashboardModule) },
            { path: 'uikit', loadChildren: () => import('./demo/components/uikit/uikit.module').then(m => m.UIkitModule), canActivate: [RoleGuard] },
            { path: 'utilities', loadChildren: () => import('./demo/components/utilities/utilities.module').then(m => m.UtilitiesModule), canActivate: [RoleGuard] },
            { path: 'documentation', loadChildren: () => import('./demo/components/documentation/documentation.module').then(m => m.DocumentationModule), canActivate: [RoleGuard] },
            { path: 'blocks', loadChildren: () => import('./demo/components/primeblocks/primeblocks.module').then(m => m.PrimeBlocksModule), canActivate: [RoleGuard] },
            { path: 'pages', loadChildren: () => import('./demo/components/pages/pages.module').then(m => m.PagesModule), canActivate: [RoleGuard] },
            { path: 'acceso', loadChildren: () => import('./demo/components/acceso/acesso.module').then(m => m.AccesoModule) },
            { path: 'generales', loadChildren: () => import('./demo/components/generales/generales.module').then(m => m.GeneraleModule), canActivate: [RoleGuard]},
            { path: 'reporte', loadChildren: () => import('./demo/components/report/report.module').then(m => m.ReportModule), canActivate: [RoleGuard]}

        ]
    },
    { 
        path: 'auth', 
        loadChildren: () => import('./demo/components/auth/auth.module').then(m => m.AuthModule) 
    },
    { 
        path: 'landing', 
        loadChildren: () => import('./demo/components/landing/landing.module').then(m => m.LandingModule) 
    },
    { 
        path: 'notfound', 
        component: NotfoundComponent 
    },
    { 
        path: '**', 
        redirectTo: '/notfound' 
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled', 
      anchorScrolling: 'enabled', 
      onSameUrlNavigation: 'reload'
    })],
    exports: [RouterModule]
})
export class AppRoutingModule {}
