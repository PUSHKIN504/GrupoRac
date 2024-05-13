import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Product } from '../../api/product';
import { ProductService } from '../../service/product.service';
import { Subscription, debounceTime } from 'rxjs';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { ServiceService } from 'src/app/Service/Marca.service';
@Component({
    templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit, OnDestroy {

    items!: MenuItem[];

    products!: Product[];

    chartData: any;

    chartOptions: any;
    marcas: any[] = [];
    usuarioId: number = 1; // Este ID debería obtenerse de la autenticación

    subscription!: Subscription;

    constructor(private productService: ProductService, public layoutService: LayoutService, private serviceService: ServiceService) {
        this.subscription = this.layoutService.configUpdate$
        .pipe(debounceTime(25))
        .subscribe((config) => {
            this.initChart();
        });
    }

    ngOnInit() {
        this.cargarMarcasPorUsuario();
      }
      
      cargarMarcasPorUsuario() {
        const usuarioJson = sessionStorage.getItem('usuario');
        console.log('Usuario desde sessionStorage:', usuarioJson);  // Verificar qué se recupera
        if (usuarioJson) {
          const usuario = JSON.parse(usuarioJson);
          console.log('Nombre de usuario utilizado para la API:', usuario.usu_Usua);  // Verificar el nombre de usuario utilizado
          this.serviceService.getMarcaPorUsuarioYSede(usuario.usu_Usua).subscribe({
            next: (data) => {
              console.log('Datos recibidos:', data);
              this.marcas = data;
              this.initChart();
              if (data.length === 0) {
                console.log('No hay marcas disponibles para este usuario.');
              }
            },
            error: (error) => {
              console.error('Error al cargar las marcas:', error);
            }
          });
        } else {
          console.error('No se encontró información del usuario.');
        }
      }
      

      initChart() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

        const labels = this.marcas.map(m => m.marca);
        const data = this.marcas.map(m => m.cantidad);

        this.chartData = {
            labels: labels,
            datasets: [
                {
                    label: 'Cantidad de Vehículos por Marca',
                    data: data,
                    fill: false,
                    backgroundColor: documentStyle.getPropertyValue('--bluegray-700'),
                    borderColor: documentStyle.getPropertyValue('--bluegray-700'),
                    tension: .4
                }
            ]
        };

        this.chartOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(tooltipItem) {
                            return tooltipItem.dataset.label + ': ' + tooltipItem.raw;
                        }
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                }
            }
        };
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
