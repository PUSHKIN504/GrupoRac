import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, debounceTime } from 'rxjs';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { DashboardService } from 'src/app/Service/dshbord.service';
import { dshbord } from 'src/app/Models/DepartamentoViewModel';
import { dcrgo } from 'src/app/Models/CargoViewModel';
import { dcliente } from 'src/app/Models/ClienteViewModel';
import {  ServiceService } from 'src/app/Service/Sede.service';
import { Sede } from 'src/app/Models/SedeViewModel';
import { Modelo } from 'src/app/Models/ModeloViewModel';
import * as chroma from 'chroma-js';

@Component({
    templateUrl: './chartsdemo.component.html'
})
export class ChartsDemoComponent implements OnInit, OnDestroy {


    barData: any;
    barData2:any;

    pieData: any;

    siData: any;


    barOptions2:any;
    barOptions: any;

    pieOptions: any;



    subscription: Subscription;

    departamentos: dshbord[] = [];
    cargos: dcrgo[] = [];
    clientes: dcliente[] = [];
    modelos: Modelo[]=[];
    sedes: any[] = [];

    sedeid: any;
    inicio:any;
    fin:any;

    constructor(private layoutService: LayoutService,
            private sedeService: ServiceService,
            private dshbordService: DashboardService
        ) {
             this.subscription = this.layoutService.configUpdate$
                .pipe(debounceTime(25))
                .subscribe((config) => {
                 });
             
             const today = new Date();
             const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
             this.inicio = firstDayOfMonth;
             this.fin = today;
    }

    

    formatDate(date: Date): string {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); 
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    onSedeChange(sed_Id: any) {
            this.sedeid = sed_Id.sed_Id;
            if(this.sedeid ==0)
                {
                    this.mostrartodas();
                }else{
            console.log(this.sedeid);

                    this.updateData();
                }
        
    }
    
    
    onFechaChange(type: string, event: any) {
        if (type === 'inicio') {
            this.inicio = event;
        } else if (type === 'fin') {
            this.fin = event;
        }
        this.updateData();
    }

    updateData() {
        let formattedInicio = null;
        let formattedFin = null;

        formattedInicio = this.formatDate(this.inicio);
        formattedFin = this.formatDate(this.fin)
        this.chartPieChart();
        this.chartBarChart();
        this.chartDoughnutChart();
        this.chartBar2Chart();
    
        this.dshbordService.Empledept(this.sedeid, formattedInicio, formattedFin)
        .subscribe({
            next: (data) => {
                this.departamentos = data.data; 
                this.chartPieChart();
            },
            error: (error) => {
                console.error('Error al obtener los datos de los departamentos', error);
            }
        });
    
        this.dshbordService.Emplecargo(this.sedeid, formattedInicio, formattedFin)
        .subscribe({
            next: (data) => {
                this.cargos = data.data; 
                this.chartBarChart();
            },
            error: (error) => {
                console.error('Error al obtener los datos de los empleados', error);
            }
        });
    
        this.dshbordService.Tocalcompras(this.sedeid, formattedInicio, formattedFin)
        .subscribe({
            next: (data) => {
                this.clientes = data.data; 
                this.chartDoughnutChart();
            },
            error: (error) => {
                console.error('Error al obtener los datos de los clientes', error);
            }
        });

        this.dshbordService.Popularidad(this.sedeid, formattedInicio, formattedFin)
        .subscribe({
            next: (data) => {
                this.modelos = data.data; 
                this.chartBar2Chart();
            },
            error: (error) => {
                console.error('Error al obtener los datos de las ventas', error);
            }
        });
    }

    todas(){
        let iniciofecha = this.formatDate(this.inicio);
        let finfecha = this.formatDate(this.fin)

        console.log('entraaltodas');
        this.dshbordService.Todasdept(iniciofecha, finfecha)
        .subscribe({
            next: (data) => {
                this.departamentos = data.data; 
                this.chartPieChart();
            },
            error: (error) => {
                console.error('Error al obtener los datos de los departamentos', error);
            }
        });

        this.dshbordService.Todascrg(iniciofecha, finfecha)
        .subscribe({
            next: (data) => {
                this.cargos = data.data; 
                this.chartBarChart();
            },
            error: (error) => {
                console.error('Error al obtener los datos de los departamentos', error);
            }
        });

        this.dshbordService.Todascli(iniciofecha, finfecha)
        .subscribe({
            next: (data) => {
                this.clientes = data.data; 
                this.chartDoughnutChart();
            },
            error: (error) => {
                console.error('Error al obtener los datos de los departamentos', error);
            }
        });

        
        this.dshbordService.Todasmode(iniciofecha, finfecha)
        .subscribe({
            next: (data) => {
                this.modelos = data.data; 
                this.chartBar2Chart();
            },
            error: (error) => {
                console.error('Error al obtener los datos de los departamentos', error);
            }
        });
      
    }

    mostrartodas(){
        this.todas();
    }
    
    ngOnInit() {
        this.sedeService.getSucursal().subscribe(
            (data: any) => {
                this.sedes = [
                    { sed_Id: 0, sed_Descripcion: 'Mostrar todas' },
                    ...data.map((sucursal: any) => ({ sed_Id: sucursal.sed_Id, sed_Descripcion: sucursal.sed_Descripcion }))
                ];
            },
            error => {
                console.log(error);
            }
        );
        
        
        const sedeid = 1;
        //parseInt(localStorage.getItem('sucursal'));

        let iniciofecha = this.formatDate(this.inicio);
        let finfecha = this.formatDate(this.fin)

        this.dshbordService.Empledept(sedeid.toString(), iniciofecha, finfecha)
        .subscribe({
            next: (data) => {
                this.departamentos = data.data; 
                this.chartPieChart();
            },
            error: (error) => {
                console.error('Error al obtener los datos de los departamentos', error);
            }
        });
    
        this.dshbordService.Emplecargo(sedeid.toString(), iniciofecha, finfecha)
        .subscribe({
            next: (data) => {
                this.cargos = data.data; 
                this.chartBarChart();
            },
            error: (error) => {
                console.error('Error al obtener los datos de los departamentos', error);
            }
        });
    
        this.dshbordService.Tocalcompras(sedeid.toString(), iniciofecha, finfecha)
        .subscribe({
            next: (data) => {
                this.clientes = data.data; 
                this.chartDoughnutChart();
            },
            error: (error) => {
                console.error('Error al obtener los datos de los departamentos', error);
            }
        });

        this.dshbordService.Popularidad(sedeid.toString(), iniciofecha, finfecha)
        .subscribe({
            next: (data) => {
                this.modelos = data.data; 
                this.chartBar2Chart();
            },
            error: (error) => {
                console.error('Error al obtener los datos de los departamentos', error);
            }
        });
    }

    chartBar2Chart() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
    
        if (Array.isArray(this.modelos)) {
            // Agrupar y sumar las cantidades de modelos por marca
            const modelosPorMarca = this.modelos.reduce((acc, modelo) => {
                const marca = modelo.mar_Descripcion;
                const modeloDesc = modelo.mod_Descripcion;
                const cantidad = parseInt(modelo.cantidadVehiculos, 10);
    
                if (!acc[marca]) {
                    acc[marca] = {};
                }
                if (!acc[marca][modeloDesc]) {
                    acc[marca][modeloDesc] = 0;
                }
                acc[marca][modeloDesc] += cantidad;
    
                return acc;
            }, {});
    
            // Preparar las etiquetas (modelos) sin duplicados
            const allModelos = Object.keys(modelosPorMarca).reduce((all, marca) => {
                Object.keys(modelosPorMarca[marca]).forEach(modelo => {
                    if (all.indexOf(modelo) === -1) {
                        all.push(modelo);
                    }
                });
                return all;
            }, []);
    
            // Preparar los datasets para cada marca, alineando datos con las etiquetas globales
            const datasets = Object.keys(modelosPorMarca).map(marca => {
                const modelos = modelosPorMarca[marca];
                const color = chroma.random();
                // Aseguramos que los datos para cada modelo estén en el orden correcto de 'allModelos'
                const datos = allModelos.map(modelo => modelos[modelo] || 0);
                return {
                    label: marca,
                    backgroundColor: color,
                    borderColor: color,
                    borderWidth: 2,
                    hoverBackgroundColor: color,
                    hoverBorderColor: color,
                    data: datos
                };
            });
    
            this.barData2 = {
                labels: allModelos,
                datasets: datasets
            };
    
            this.barOptions = {
                plugins: {
                    legend: {
                        labels: {
                            color: textColor
                        }
                    }
                },
                scales: {
                    x: {
                        ticks: {
                            color: textColor,
                            font: {
                                weight: 500
                            }
                        },
                        grid: {
                            display: false,
                            drawBorder: false
                        }
                    },
                    y: {
                        ticks: {
                            color: textColor,
                            callback: function(value) {
                                return value;
                            }
                        },
                        grid: {
                            color: surfaceBorder,
                            drawBorder: false
                        }
                    },
                }
            };
        } else {
            console.error('No se pudo inicializar el gráfico porque no hay datos.');
        }
    }
    

    chartPieChart() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
    
    if (Array.isArray(this.departamentos)) {
        const colors = this.departamentos.map((_, index) => `hsl(${index * 40}, 100%, 60%)`); 

        this.pieData = {
            labels: this.departamentos.map(departamento => departamento.dep_Descripcion || 'No hay'),
            datasets: [
                {
                    data: this.departamentos.map(departamento => parseInt(departamento.totalEmpleados)),
                    backgroundColor: colors,
                    hoverBackgroundColor: colors
                }]
        };
    
        this.pieOptions = {
            plugins: {
                legend: {
                    labels: {
                        usePointStyle: true, 
                        color: textColor
                    }
                }
            }
        };
        
    } else {
        console.error('no funciona');
    }
}
chartBarChart() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
  
    if (Array.isArray(this.cargos)) {
      const colors = this.cargos.map(() => chroma.random());
  
      this.barData = {
        labels: this.cargos.map(cargo => cargo.crg_Descripcion || 'No hay'),
        datasets: [
          {
            label: 'Total Ventas',
            backgroundColor: colors,
            borderColor: colors,
            borderWidth: 2,
            hoverBackgroundColor: colors, 
            hoverBorderColor: colors, 
            data: this.cargos.map(cargo => parseInt(cargo.totalEmpleados))
          }
        ]
      };
  
      this.barOptions = {
        plugins: {
            legend: {
                labels: {
                    fontColor: textColor
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: textColor,
                    font: {
                        weight: 500
                    }
                },
                grid: {
                    display: false,
                    drawBorder: false
                }
            },
            y: {
                ticks: {
                    color: textColor,
                    callback: function(value, index, values) {
                        return value;
                    }
                },
                grid: {
                    color: surfaceBorder,
                    drawBorder: false
                }
            },
        }
    };
    
    } else {
      console.error('no funciona');
    }
  }

    
    chartDoughnutChart() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
        
        if (Array.isArray(this.clientes)) {
            this.siData = {
                labels: this.clientes.map(cliente => cliente.nombreCompleto || 'No hay'),
                datasets: [
                    {
                        data: this.clientes.map(cliente => parseInt(cliente.totalGastado)),
                        backgroundColor: [
                            documentStyle.getPropertyValue('--indigo-500'),
                            documentStyle.getPropertyValue('--purple-500'),
                            documentStyle.getPropertyValue('--teal-500')
                        ],
                        hoverBackgroundColor: [
                            documentStyle.getPropertyValue('--indigo-400'),
                            documentStyle.getPropertyValue('--purple-400'),
                            documentStyle.getPropertyValue('--teal-400')
                        ]
                    }]
            };
        
            this.pieOptions = {
                plugins: {
                    legend: {
                        labels: {
                            usePointStyle: true,
                            color: textColor
                        }
                    }
                }
            };
        } else {
            console.error('no funciona');
        }
    }
    

   

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
    
}