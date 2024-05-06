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
                            
                            /*{
                                label: 'Roles',
                                icon: 'pi pi-fw pi-times-circle',
                                routerLink: ['/auth/error']
                            },*/
                        ]
                    },
                    
                 

                ]
            },
            {
                items: [
                    {
                        label: 'General',
                        icon: 'pi pi-fw pi-prime',
                        items: [
                            {
                                label: 'Departamento',
                                icon: 'pi pi-fw pi-sign-in',
                                routerLink: ['/app/uikit/departamento']
                            },
                            {
                                label: 'Ciudades',
                                icon: 'pi pi-fw pi-globe',
                                routerLink: ['/app/uikit/ciudad']
                            },
                            {
                                label: 'Cargos',
                                icon: 'pi pi-fw pi-user',
                                routerLink: ['/app/uikit/cargo']
                            },
                            {
                                label: 'Clientes',
                                icon: 'pi pi-fw pi-user',
                                routerLink: ['/app/uikit/cliente']
                            },
                            {
                                label: 'Estados Civiles',
                                icon: 'pi pi-fw pi-user',
                                routerLink: ['/app/uikit/estadocivil']
                            },
                            {
                                label: 'Marcas',
                                icon: 'pi pi-fw pi-user',
                                routerLink: ['/app/uikit/marca']
                            },
                            {
                                label: 'Modelo',
                                icon: 'pi pi-fw pi-user',
                                routerLink: ['/app/uikit/modelo']
                            },
                            {
                                label: 'Sede',
                                icon: 'pi pi-fw pi-user',
                                routerLink: ['/app/uikit/sede']
                            },
                            {
                                label: 'Vehiculo',
                                icon: 'pi pi-fw pi-user',
                                routerLink: ['/app/uikit/veh']
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
                                icon: 'pi pi-fw pi-times-circle',
                                routerLink: ['/auth/error']
                            },
                        ]
                    },
                    
                 

                ]
            },
        ];
    }
}
