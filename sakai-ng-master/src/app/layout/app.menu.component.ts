import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService) { }

    ngOnInit() {
        this.model = [
            {
                //label: 'Home',
                items: [
                    { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/app/dashboard'] }
                ]
            },
            {
                items: [
                    {
                        label: 'Acceso',
                        icon: 'pi pi-fw pi-user',
                        items: [
                            {
                                label: 'Usuario',
                                icon: 'pi pi-fw pi-user',
                                routerLink: ['/app/uikit/usuario']
                            },
                            
                            {
                                label: 'Roles',
                                icon: 'pi pi-fw pi-folder',
                                routerLink: ['/app/acceso/rol']
                            },
                        ]
                    },
                    
                 

                ]
            },
            {
                items: [
                    {
                        label: 'General',
                        icon: 'pi pi-fw pi-cloud',
                        items: [
                            {
                                label: 'Departamento',
                                icon: 'pi pi-fw pi-inbox',
                                routerLink: ['/app/generales/departamento']
                            },
                            {
                                label: 'Municipio',
                                icon: 'pi pi-fw pi-inbox',
                                routerLink: ['/app/generales/Municipio']
                            },
                            {
                                label: 'Cargos',
                                icon: 'pi pi-fw pi-inbox',
                                routerLink: ['/app/generales/Cargo']
                            },
                            {
                                label: 'Clientes',
                                icon: 'pi pi-fw pi-inbox',
                                routerLink: ['/app/generales/Cliente']
                            },
                            {
                                label: 'Empleado',
                                icon: 'pi pi-fw pi-inbox',
                                routerLink: ['/app/generales/Empleado']
                            },
                            {
                                label: 'Estados Civiles',
                                icon: 'pi pi-fw pi-inbox',
                                routerLink: ['/app/generales/EstadoCivil']
                            },
                            {
                                label: 'Marcas',
                                icon: 'pi pi-fw pi-inbox',
                                routerLink: ['/app/generales/Marca']
                            },
                            {
                                label: 'Modelo',
                                icon: 'pi pi-fw pi-inbox',
                                routerLink: ['/app/uikit/modelo']
                            },
                            {
                                label: 'Sede',
                                icon: 'pi pi-fw pi-inbox',
                                routerLink: ['/app/generales/Sede']
                            },
                            {
                                label: 'Vehiculo',
                                icon: 'pi pi-fw pi-inbox',
                                routerLink: ['/app/uikit/veh']
                            },
                            {
                                label: 'graficos',
                                icon: 'pi pi-fw pi-inbox',
                                routerLink: ['/app/uikit/charts']
                            },

                        ]
                    },
                    
                 

                ]
            },
            {
                items: [
                    {
                        label: 'Factura',
                        icon: 'pi pi-fw pi-car',
                        items: [
                            {

                                label: 'Factura Compra',
                                icon: 'pi pi-fw pi-sign-in',
                                routerLink: ['/app/uikit/comp']

                            },
                            {
                                label: 'Detalle',
                                icon: 'pi pi-fw pi-folder',
                                routerLink: ['/auth/error']
                            },
                        ]
                    },

                ]
            },
        ];
    }
}
