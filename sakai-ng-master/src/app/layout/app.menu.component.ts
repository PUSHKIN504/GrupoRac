import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';
import { CookieService } from 'ngx-cookie-service';
import { ServiceService } from '../Service/Roles.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    //model: any[] = [];

    model: any[] = [];
    permisosPermitidos: Set<string> = new Set();
    prueba: boolean = false;

    constructor(private servicioLogin: ServiceService,public layoutService: LayoutService, private cookieService: CookieService) { }

    // ngOnInit() {
    //     this.model = [
    //         {
    //             //label: 'Home',
                
    //         },
    //     ];

    // }


    //----------------------------------------------------------

    ngOnInit() {
        const admin = this.cookieService.get('esAdmin').toString();
        console.log("Admin status:", admin);
        if (admin !== "true") {
            const roleId = Number.parseInt(this.cookieService.get('roleID'));
            this.servicioLogin.getPantallasDeRol(roleId).subscribe({
                next: (response) => {
                    if (response && response.data && Array.isArray(response.data)) {
                        const pantallasPermitidas = response.data;
                        const nombresPermitidos = new Set(pantallasPermitidas.map(pant => pant.ptl_Descripcion.toLowerCase().trim()));
                        console.log('Permitted screens:', nombresPermitidos);

                        const filtrarSubitems = (subitems) => subitems.filter(opcion => nombresPermitidos.has(opcion.label.toLowerCase().trim()));
                        this.model = this.menuCompleto.map(section => {
                            const itemsFiltrados = section.items.map(subSection => ({
                                ...subSection,
                                items: filtrarSubitems(subSection.items || [])
                            })).filter(subSection => subSection.items.length > 0);

                            return { ...section, items: itemsFiltrados };
                        }).filter(section => section.items.length > 0);
                    } else {
                        console.error('Invalid response structure:', response);
                    }
                },
                error: (err) => {
                    console.error('Error fetching role screens:', err);
                }
            });
        } else {
            this.model = this.menuCompleto; // Admin gets the full menu
        }
    }
    
    menuCompleto = [
        {
            items: [
                                    { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/app/dashboard'] }
                                ]
                            },
                {
                    items: [
                        {
                            label: 'Reportes',
                            icon: 'pi pi-fw pi-book',
                            items: [
                                {
                                    label: 'Compras',
                                    icon: 'pi pi-fw pi-money',
                                    routerLink: ['/app/reporte/reporteCompra']
                                },
                                
                                {
                                    label: 'Ventas',
                                    icon: 'pi pi-fw pi-money',
                                    routerLink: ['/app/reporte/reporteVenta']
                                },
                                
                                {
                                    label: 'Clientes',
                                    icon: 'pi pi-fw pi-user',
                                    routerLink: ['/app/reporte/reporteCliente']
                                },
                                
                                {
                                    label: 'Empleados',
                                    icon: 'pi pi-fw pi-user',
                                    routerLink: ['/app/reporte/reporteEmpleado']
                                },
                                {
                                    label: 'Vehiculos',
                                    icon: 'pi pi-fw pi-car',
                                    routerLink: ['/app/reporte/reporteVehiculo']
                                },
                            ]
                        },
                        
                    ]
                },
                            {
                                items: [
                                    {
                                        label: 'Acceso',
                                        icon: 'pi pi-fw pi-user',
                                        items: [
                                            {
                                                label: 'Usuarios',
                                                icon: 'pi pi-fw pi-user',
                                                routerLink: ['/app/uikit/usuario']
                                            },
                                            
                                            {
                                                label: 'Roles',
                                                icon: 'pi pi-fw pi-folder',
                                                routerLink: ['/app/acceso/role']
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
                                                label: 'Departamentos',
                                                icon: 'pi pi-fw pi-inbox',
                                                routerLink: ['/app/generales/departamento']
                                            },
                                            {
                                                label: 'Municipios',
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
                                                label: 'Modelos',
                                                icon: 'pi pi-fw pi-inbox',
                                                routerLink: ['/app/uikit/modelo']
                                            },
                                            {
                                                label: 'Sedes',
                                                icon: 'pi pi-fw pi-inbox',
                                                routerLink: ['/app/generales/Sede']
                                            },
                                            // {
                                            //     label: 'Vehiculos',
                                            //     icon: 'pi pi-fw pi-inbox',
                                            //     routerLink: ['/app/uikit/veh']
                                            // },
                                            {
                                                label: 'Graficos',
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
                
                                                label: 'Facturas Compras',
                                                icon: 'pi pi-fw pi-sign-in',
                                                routerLink: ['/app/uikit/comp']
                
                                            },
                                            
                                        ]
                                    },
                
                                ]
        },
    ];

}
