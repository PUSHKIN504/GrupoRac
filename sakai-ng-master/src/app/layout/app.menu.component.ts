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
                                label: 'Usuarios',
                                icon: 'pi pi-fw pi-sign-in',
                                routerLink: ['/uikit/departamento']
                            },
                            
                            {
                                label: 'Roles',
                                icon: 'pi pi-fw pi-times-circle',
                                routerLink: ['/auth/error']
                            },
                        ]
                    },
                    
                 

                ]
            },
            {
                items: [
                    {
                        label: 'Generales',
                        icon: 'pi pi-fw pi-user',
                        items: [
                            {
                                label: 'Departamentos',
                                icon: 'pi pi-fw pi-sign-in',
                                routerLink: ['/auth/login']
                            },
                            {
                                label: 'Ciudades',
                                icon: 'pi pi-fw pi-globe',
                                routerLink: ['/uikit/ciudad']
                            },
                            {
                                label: 'Cargos',
                                icon: 'pi pi-fw pi-user',
                                routerLink: ['/uikit/cargo']
                            },
                            {
                                label: 'Clientes',
                                icon: 'pi pi-fw pi-user',
                                routerLink: ['/uikit/cliente']
                            },
                            {
                                label: 'Estados Civiles',
                                icon: 'pi pi-fw pi-user',
                                routerLink: ['/uikit/estadocivil']
                            },
                            {
                                label: 'Marcas',
                                icon: 'pi pi-fw pi-user',
                                routerLink: ['/uikit/marca']
                            },
                            {
                                label: 'Modelo',
                                icon: 'pi pi-fw pi-user',
                                routerLink: ['/uikit/modelo']
                            },
                            {
                                label: 'Sede',
                                icon: 'pi pi-fw pi-user',
                                routerLink: ['/uikit/sede']
                            },
                            {
                                label: 'Vehiculo',
                                icon: 'pi pi-fw pi-user',
                                routerLink: ['/uikit/veh']
                            },
                            {
                                label: 'Usuario',
                                icon: 'pi pi-fw pi-user',
                                routerLink: ['/uikit/usuario']
                            },
                        ]
                    },
                    
                 

                ]
            },
            {
                items: [
                    {
                        label: 'Ventas',
                        icon: 'pi pi-fw pi-user',
                        items: [
                            {
                                label: 'Joyas',
                                icon: 'pi pi-fw pi-sign-in',
                                routerLink: ['/auth/login']
                            },
                            {
                                label: 'Maquillajes',
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
