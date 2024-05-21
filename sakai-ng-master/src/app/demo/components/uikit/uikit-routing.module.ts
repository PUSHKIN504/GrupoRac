import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { RoleGuard } from 'src/app/guards/role.guard';

const routes: Routes = [
  { path: 'button', data: { breadcrumb: 'Button' }, loadChildren: () => import('./button/buttondemo.module').then(m => m.ButtonDemoModule), canActivate: [AuthGuard, RoleGuard] },
  { path: 'charts', data: { breadcrumb: 'Charts' }, loadChildren: () => import('./charts/chartsdemo.module').then(m => m.ChartsDemoModule), canActivate: [AuthGuard, RoleGuard] },
  { path: 'file', data: { breadcrumb: 'File' }, loadChildren: () => import('./file/filedemo.module').then(m => m.FileDemoModule), canActivate: [AuthGuard, RoleGuard] },
  { path: 'floatlabel', data: { breadcrumb: 'Float Label' }, loadChildren: () => import('./floatlabel/floatlabeldemo.module').then(m => m.FloatlabelDemoModule), canActivate: [AuthGuard, RoleGuard] },
  { path: 'formlayout', data: { breadcrumb: 'Form Layout' }, loadChildren: () => import('./formlayout/formlayoutdemo.module').then(m => m.FormLayoutDemoModule), canActivate: [AuthGuard, RoleGuard] },
  { path: 'input', data: { breadcrumb: 'Input' }, loadChildren: () => import('./input/inputdemo.module').then(m => m.InputDemoModule), canActivate: [AuthGuard, RoleGuard] },
  { path: 'invalidstate', data: { breadcrumb: 'Invalid State' }, loadChildren: () => import('./invalid/invalidstatedemo.module').then(m => m.InvalidStateDemoModule), canActivate: [AuthGuard, RoleGuard] },
  { path: 'list', data: { breadcrumb: 'List' }, loadChildren: () => import('./list/listdemo.module').then(m => m.ListDemoModule), canActivate: [AuthGuard, RoleGuard] },
  { path: 'media', data: { breadcrumb: 'Media' }, loadChildren: () => import('./media/mediademo.module').then(m => m.MediaDemoModule), canActivate: [AuthGuard, RoleGuard] },
  { path: 'message', data: { breadcrumb: 'Message' }, loadChildren: () => import('./messages/messagesdemo.module').then(m => m.MessagesDemoModule), canActivate: [AuthGuard, RoleGuard] },
  { path: 'misc', data: { breadcrumb: 'Misc' }, loadChildren: () => import('./misc/miscdemo.module').then(m => m.MiscDemoModule), canActivate: [AuthGuard, RoleGuard] },
  { path: 'overlay', data: { breadcrumb: 'Overlay' }, loadChildren: () => import('./overlays/overlaysdemo.module').then(m => m.OverlaysDemoModule), canActivate: [AuthGuard, RoleGuard] },
  { path: 'panel', data: { breadcrumb: 'Panel' }, loadChildren: () => import('./panels/panelsdemo.module').then(m => m.PanelsDemoModule), canActivate: [AuthGuard, RoleGuard] },
  { path: 'table', data: { breadcrumb: 'Table' }, loadChildren: () => import('./table/tabledemo.module').then(m => m.TableDemoModule), canActivate: [AuthGuard, RoleGuard] },
  { path: 'tree', data: { breadcrumb: 'Tree' }, loadChildren: () => import('./tree/treedemo.module').then(m => m.TreeDemoModule), canActivate: [AuthGuard, RoleGuard] },
  { path: 'menu', data: { breadcrumb: 'Menu' }, loadChildren: () => import('./menus/menus.module').then(m => m.MenusModule), canActivate: [AuthGuard, RoleGuard] },
  { path: 'cargo', data: { breadcrumb: 'Cargo' }, loadChildren: () => import('./Cargo/Cargodemo.module').then(m => m.CargoDemoModule), canActivate: [AuthGuard, RoleGuard] },
  { path: 'cliente', data: { breadcrumb: 'Cliente' }, loadChildren: () => import('./Cliente/clientedemo.module').then(m => m.ClienteDemoModule), canActivate: [AuthGuard, RoleGuard] },
  { path: 'marca', data: { breadcrumb: 'Marca' }, loadChildren: () => import('./Marca/Marcademo.module').then(m => m.MarcaDemoModule), canActivate: [AuthGuard, RoleGuard] },
  { path: 'modelos', data: { breadcrumb: 'Modelo' }, loadChildren: () => import('./Modelo/Modelodemo.module').then(m => m.ModeloDemoModule), canActivate: [AuthGuard, RoleGuard] },
  { path: 'sede', data: { breadcrumb: 'Sede' }, loadChildren: () => import('./Sede/Sededemo.module').then(m => m.SedeDemoModule), canActivate: [AuthGuard, RoleGuard] },
  { path: 'vehiculos', data: { breadcrumb: 'Veh' }, loadChildren: () => import('./Vehiculo/Vehiculodemo.module').then(m => m.VehiculoDemoModule), canActivate: [AuthGuard, RoleGuard] },
  { path: 'usuarios', data: { breadcrumb: 'Usuarios' }, loadChildren: () => import('./Usuario/Usuariodemo.module').then(m => m.UsuarioDemoModule), canActivate: [AuthGuard, RoleGuard] },
  { path: 'roles', data: { breadcrumb: 'Roles' }, loadChildren: () => import('./rol/rol.module').then(m => m.RolModule), canActivate: [AuthGuard, RoleGuard] },
  { path: 'comp', data: { breadcrumb: 'Comp' }, loadChildren: () => import('./Facturas/Compras/compras.module').then(m => m.CompDemoModule), canActivate: [AuthGuard, RoleGuard] },
  { path: '**', redirectTo: '/notfound' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UIkitRoutingModule { }
