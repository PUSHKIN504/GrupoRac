import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';
import { CookieService } from 'ngx-cookie-service';
import { ServiceService } from '../Service/Roles.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];
    permisosPermitidos: Set<string> = new Set();
    prueba: boolean = false;

    constructor(
        private servicioLogin: ServiceService,
        public layoutService: LayoutService, 
        private cookieService: CookieService,
        private router: Router
    ) { }

    ngOnInit() {
        const admin = this.cookieService.get('esAdmin').toString();
        console.log("Admin status from cookie:", admin);
    
        if (admin !== "true") {
          this.loadUserRoleMenu();
        } else {
          console.log('Admin user detected. Loading full menu.');
          this.model = this.menuCompleto; // Admin gets the full menu
          console.log('Admin full menu model:', this.model);
        }
      }
    
      loadUserRoleMenu() {
        const roleId = Number(this.cookieService.get('roleID'));
        console.log("Role ID from cookie:", roleId);
    
        if (isNaN(roleId)) {
          console.error('Invalid role ID:', roleId);
          this.router.navigate(['/login']); // Redirige a la página de inicio de sesión si el rol no es válido
          return;
        }
    
        this.servicioLogin.getPantallasDeRol(roleId).subscribe({
          next: (response) => this.handleRoleScreensResponse(response),
          error: (err) => {
            console.error('Error fetching role screens:', err);
            this.router.navigate(['/login']); // Redirige a la página de inicio de sesión en caso de error
          }
        });
      }
    
      handleRoleScreensResponse(response: any) {
        console.log('Response from service:', response);
    
        if (response && response.data && Array.isArray(response.data)) {
          const pantallasPermitidas = response.data.map(pant => pant.ptl_Descripcion.toLowerCase().trim());
          console.log('Permitted screen names:', pantallasPermitidas);
    
          const nombresPermitidos = new Set(pantallasPermitidas);
          console.log('Nombres permitidos:', nombresPermitidos);
    
          const filtrarSubitems = (subitems) => subitems.filter(opcion => {
            const validLabel = nombresPermitidos.has(opcion.label.toLowerCase().trim());
            const validUrl = this.validateUrl(opcion.routerLink[0]);
            console.log(`Validating option: ${opcion.label}, URL: ${opcion.routerLink}, validLabel: ${validLabel}, isValid: ${validUrl}`);
            return validLabel && validUrl;
          });
    
          this.model = this.menuCompleto.map(section => {
            const itemsFiltrados = section.items.map(subSection => ({
              ...subSection,
              items: filtrarSubitems(subSection.items || [])
            })).filter(subSection => subSection.items && subSection.items.length > 0);
    
            return { ...section, items: itemsFiltrados };
          }).filter(section => section.items && section.items.length > 0);
    
          console.log('Filtered menu model:', this.model);
        } else {
          console.error('Invalid response structure:', response);
          this.router.navigate(['/login']); // Redirige a la página de inicio de sesión si la estructura de la respuesta no es válida
        }
      }
    
      validateUrl(url: string): boolean {
        if (typeof url !== 'string') {
          console.warn('Invalid URL:', url);
          return false;
        }
    
        const cleanedUrl = url.startsWith('/') ? url.substring(1) : url;
        console.log(`Cleaning URL: ${url} -> ${cleanedUrl}`);
    
        const routes = this.router.config;
        console.log('Router Config:', routes);
    
        const checkRoutes = (routes: any[], path: string): boolean => {
          for (const route of routes) {
            if (route.path === path) {
              console.log(`Route matched: ${route.path}`);
              return true;
            }
            if (route.children) {
              const isChildMatch = checkRoutes(route.children, path);
              console.log(`Checking children routes for path: ${path} - Result: ${isChildMatch}`);
              if (isChildMatch) {
                return true;
              }
            }
          }
          return false;
        };
    
        const isValid = checkRoutes(routes, cleanedUrl);
        console.log(`URL validation result for ${url}: ${isValid}`);
        return isValid;
      }
    
      onMenuItemClick(routerLink: string) {
        this.router.navigate([routerLink]);
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
                            icon: 'pi pi-fw pi-money-bill',
                            routerLink: '/app/reporte/reporteCompra',
                            command: (event) => this.onMenuItemClick('/app/reporte/reporteCompra')
                        },
                        
                        {
                            label: 'Ventas',
                            icon: 'pi pi-fw pi-money-bill',
                            routerLink: '/app/reporte/reporteVenta',
                            command: (event) => this.onMenuItemClick('/app/reporte/reporteVenta')
                        },
                        
                        {
                            label: 'Clientes',
                            icon: 'pi pi-fw pi-user',
                            routerLink: '/app/reporte/reporteCliente',
                            command: (event) => this.onMenuItemClick('/app/reporte/reporteCliente')
                        },
                        
                        {
                            label: 'Empleados',
                            icon: 'pi pi-fw pi-user',
                            routerLink: '/app/reporte/reporteEmpleado',
                            command: (event) => this.onMenuItemClick('/app/reporte/reporteEmpleado')
                        },
                        {
                            label: 'Vehiculos',
                            icon: 'pi pi-fw pi-car',
                            routerLink: '/app/reporte/reporteVehiculo',
                            command: (event) => this.onMenuItemClick('/app/reporte/reporteVehiculo')
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
                            routerLink: '/app/uikit/usuarios',
                            command: (event) => this.onMenuItemClick('/app/uikit/usuarios')
                        },
                        
                        {
                            label: 'Roles',
                            icon: 'pi pi-fw pi-folder',
                            routerLink: '/app/acceso/roles',
                            command: (event) => this.onMenuItemClick('/app/acceso/roles')
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
                            routerLink: '/app/generales/departamentos',
                            command: (event) => this.onMenuItemClick('/app/generales/departamentos')
                        },
                        {
                            label: 'Municipios',
                            icon: 'pi pi-fw pi-inbox',
                            routerLink: '/app/generales/municipios',
                            command: (event) => this.onMenuItemClick('/app/generales/municipios')
                        },
                        {
                            label: 'Cargos',
                            icon: 'pi pi-fw pi-inbox',
                            routerLink: '/app/generales/cargos',
                            command: (event) => this.onMenuItemClick('/app/generales/cargos')
                        },
                        {
                            label: 'Clientes',
                            icon: 'pi pi-fw pi-inbox',
                            routerLink: '/app/generales/clientes',
                            command: (event) => this.onMenuItemClick('/app/generales/clientes')
                        },
                        {
                            label: 'Empleado',
                            icon: 'pi pi-fw pi-inbox',
                            routerLink: '/app/generales/empleados',
                            command: (event) => this.onMenuItemClick('/app/generales/empleados')
                        },
                        {
                            label: 'Estados Civiles',
                            icon: 'pi pi-fw pi-inbox',
                            routerLink: '/app/generales/estadosciviles',
                            command: (event) => this.onMenuItemClick('/app/generales/estadosciviles')
                        },
                        {
                            label: 'Marcas',
                            icon: 'pi pi-fw pi-inbox',
                            routerLink: '/app/generales/marcas',
                            command: (event) => this.onMenuItemClick('/app/generales/marcas')
                        },
                        {
                            label: 'Modelos',
                            icon: 'pi pi-fw pi-inbox',
                            routerLink: '/app/uikit/modelos',
                            command: (event) => this.onMenuItemClick('/app/uikit/modelos')
                        },
                        {
                            label: 'Sedes',
                            icon: 'pi pi-fw pi-inbox',
                            routerLink: '/app/generales/sedes',
                            command: (event) => this.onMenuItemClick('/app/generales/sedes')
                        },
                        // {
                        //     label: 'Vehiculos',
                        //     icon: 'pi pi-fw pi-inbox',
                        //     routerLink: ['/app/uikit/veh'],
                        //command: (event) => this.onMenuItemClick('/app/uikit/vehiculos')
                        // },
                        {
                            label: 'Graficos',
                            icon: 'pi pi-fw pi-inbox',
                            routerLink: '/app/uikit/charts',
                            command: (event) => this.onMenuItemClick('/app/uikit/charts')
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
                            icon: 'pi pi-fw pi-file',
                            routerLink: '/app/uikit/comp',
                            command: (event) => this.onMenuItemClick('/app/uikit/comp')
                        },
                        
                    ]
                },
            ]
        },
    ];

}
