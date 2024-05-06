import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'button', data: { breadcrumb: 'Button' }, loadChildren: () => import('./button/buttondemo.module').then(m => m.ButtonDemoModule) },
        { path: 'charts', data: { breadcrumb: 'Charts' }, loadChildren: () => import('./charts/chartsdemo.module').then(m => m.ChartsDemoModule) },
        { path: 'file', data: { breadcrumb: 'File' }, loadChildren: () => import('./file/filedemo.module').then(m => m.FileDemoModule) },
        { path: 'floatlabel', data: { breadcrumb: 'Float Label' }, loadChildren: () => import('./floatlabel/floatlabeldemo.module').then(m => m.FloatlabelDemoModule) },
        { path: 'formlayout', data: { breadcrumb: 'Form Layout' }, loadChildren: () => import('./formlayout/formlayoutdemo.module').then(m => m.FormLayoutDemoModule) },
        { path: 'input', data: { breadcrumb: 'Input' }, loadChildren: () => import('./input/inputdemo.module').then(m => m.InputDemoModule) },
        { path: 'invalidstate', data: { breadcrumb: 'Invalid State' }, loadChildren: () => import('./invalid/invalidstatedemo.module').then(m => m.InvalidStateDemoModule) },
        { path: 'list', data: { breadcrumb: 'List' }, loadChildren: () => import('./list/listdemo.module').then(m => m.ListDemoModule) },
        { path: 'media', data: { breadcrumb: 'Media' }, loadChildren: () => import('./media/mediademo.module').then(m => m.MediaDemoModule) },
        { path: 'message', data: { breadcrumb: 'Message' }, loadChildren: () => import('./messages/messagesdemo.module').then(m => m.MessagesDemoModule) },
        { path: 'misc', data: { breadcrumb: 'Misc' }, loadChildren: () => import('./misc/miscdemo.module').then(m => m.MiscDemoModule) },
        { path: 'overlay', data: { breadcrumb: 'Overlay' }, loadChildren: () => import('./overlays/overlaysdemo.module').then(m => m.OverlaysDemoModule) },
        //departamento
        { path: 'departamento', data: { breadcrumb: 'Departamento' }, loadChildren: () => import('./Departamento/Departamentodemo.module').then(m => m.DepartamentoDemoModule) },
        { path: 'panel', data: { breadcrumb: 'Panel' }, loadChildren: () => import('./panels/panelsdemo.module').then(m => m.PanelsDemoModule) },
        { path: 'table', data: { breadcrumb: 'Table' }, loadChildren: () => import('./table/tabledemo.module').then(m => m.TableDemoModule) },
        { path: 'tree', data: { breadcrumb: 'Tree' }, loadChildren: () => import('./tree/treedemo.module').then(m => m.TreeDemoModule) },
        { path: 'menu', data: { breadcrumb: 'Menu' }, loadChildren: () => import('./menus/menus.module').then(m => m.MenusModule) },

        //ciudad
        { path: 'ciudad', data: { breadcrumb: 'Ciudad' }, loadChildren: () => import('./Ciudad/Ciudaddemo.module').then(m => m.CiudadDemoModule) },
        //cargo
        { path: 'cargo', data: { breadcrumb: 'Cargo' }, loadChildren: () => import('./Cargo/Cargodemo.module').then(m => m.CargoDemoModule) },
        //cliente
        { path: 'cliente', data: { breadcrumb: 'cliente' }, loadChildren: () => import('./Cliente/clientedemo.module').then(m => m.ClienteDemoModule) },
        //EstadoCivil
        { path: 'estadocivil', data: { breadcrumb: 'estadocivil' }, loadChildren: () => import('./EstadoCivil/EstadoCivildemo.module').then(m => m.EstadoCivilDemoModule) },
        //marcas
        { path: 'marca', data: { breadcrumb: 'marca' }, loadChildren: () => import('./Marca/Marcademo.module').then(m => m.MarcaDemoModule) },
        //Modelo
        { path: 'modelo', data: { breadcrumb: 'modelo' }, loadChildren: () => import('./Modelo/Modelodemo.module').then(m => m.ModeloDemoModule) },
        //Sede
        { path: 'sede', data: { breadcrumb: 'sede' }, loadChildren: () => import('./Sede/Sededemo.module').then(m => m.SedeDemoModule) },
        //Veh
        { path: 'veh', data: { breadcrumb: 'veh' }, loadChildren: () => import('./Vehiculo/Vehiculodemo.module').then(m => m.VehiculoDemoModule) },
        //Usuario
        { path: 'usuario', data: { breadcrumb: 'usuario' }, loadChildren: () => import('./Usuario/Usuariodemo.module').then(m => m.UsuarioDemoModule) },
        //Compras
        { path: 'comp', data: { breadcrumb: 'comp' }, loadChildren: () => import('./CompraFact/Compdemo.module').then(m => m.CompDemoModule) },

        { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})
export class UIkitRoutingModule { }
