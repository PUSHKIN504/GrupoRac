// import { Component, OnDestroy, OnInit } from '@angular/core';
// import { Subscription, debounceTime } from 'rxjs';
// import { LayoutService } from 'src/app/layout/service/app.layout.service';
// import {Cargo} from 'src/app/Models/CargoViewModel'
// import { DashboardService } from 'src/app/Service/dshbord.service';
// import { dshbord } from 'src/app/Models/DepartamentoViewModel';
// import { dcrgo } from 'src/app/Models/CargoViewModel';
// import { dcliente } from 'src/app/Models/ClienteViewModel';
// import { Cliente,ClienteEnviar,Fill } from 'src/app/Models/ClienteViewModel';
// import { ServiceSede } from 'src/app/Service/service.service';
// import { Sede } from 'src/app/Models/SedeViewModel';
// import { Modelo } from 'src/app/Models/ModeloViewModel';
// import * as chroma from 'chroma-js';

// @Component({
//     templateUrl: './chrtsdemo.component.html'
// })
// export class ChartsDemoComponent implements OnInit, OnDestroy {

//     lineData: any;

//     barData: any;

//     pieData: any;

//     siData: any;

//     radarData: any;

//     lineOptions: any;

//     barOptions: any;

//     pieOptions: any;


//     radarOptions: any;

//     subscription: Subscription;

//     departamentos: dshbord[] = [];
//     cargos: dcrgo[] = [];
//     clientes: dcliente[] = [];
//     modelos: Modelo[]=[];
//      sedes: Sede[] = [];

//     sedeid: any;
//     inicio:any;
//     fin:any;

//     constructor(private layoutService: LayoutService,
//             private sedeService: ServiceSede,
//             private dshbordService: DashboardService,
//             // private subcategoriaService: SubcategoriaService,
//             // private productoService: ProductoService
//         ) {
//              this.subscription = this.layoutService.configUpdate$
//                 .pipe(debounceTime(25))
//                 .subscribe((config) => {
//                      this.initCharts();
//                  });
             
//              const today = new Date();
//              const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
//              this.inicio = firstDayOfMonth;
//              this.fin = today;
//     }

    

//     formatDate(date: Date): string {
//         const year = date.getFullYear();
//         const month = String(date.getMonth() + 1).padStart(2, '0'); 
//         const day = String(date.getDate()).padStart(2, '0');
//         return `${year}-${month}-${day}`;
//     }

//     onSedeChange(sed_Id: any) {
//         this.sedeid = sed_Id.sed_Id;
//         console.log(this.sedeid);
//         this.updateData();
//     }
    
//     onFechaChange(type: string, event: any) {
//         if (type === 'inicio') {
//             this.inicio = event;
//         } else if (type === 'fin') {
//             this.fin = event;
//         }
//         this.updateData();
//     }

//     updateData() {
//         let formattedInicio = null;
//         let formattedFin = null;

//         formattedInicio = this.formatDate(this.inicio);
//         formattedFin = this.formatDate(this.fin)

//         this.chartPieChart();
//         this.chartBarChart();
//         this.chartDoughnutChart();
//         this.chartLineChart();
    
//         this.dshbordService.Empledept(this.sedeid, formattedInicio, formattedFin)
//         .subscribe({
//             next: (data) => {
//                 this.departamentos = data.data; 
//                 this.chartPieChart();
//             },
//             error: (error) => {
//                 console.error('Error al obtener los datos de los departamentos', error);
//             }
//         });
    
//         this.dshbordService.Emplecargo(this.sedeid, formattedInicio, formattedFin)
//         .subscribe({
//             next: (data) => {
//                 this.departamentos = data.data; 
//                 this.chartPieChart();
//             },
//             error: (error) => {
//                 console.error('Error al obtener los datos de los departamentos', error);
//             }
//         });
    
//         this.productoService.Existencia(this.sucursalid).then(data => {
//             this.productos = data.data;
//             console.log(this.productos);
//             this.chartDoughnutChart();
//         });

//         this.productoService.Ventas(this.sucursalid, formattedInicio, formattedFin).then(data => {
//             this.productos = data.data;
//             this.chartLineChart();
//         });
//     }

//     todas(){
//         let iniciofecha = this.formatDate(this.inicio);
//         let finfecha = this.formatDate(this.fin)

//         this.categoriaService.Todas(iniciofecha, finfecha).then(data => {
//             this.categorias = data.data;
//             this.chartPieChart();
//         });

//         this.subcategoriaService.Todas(iniciofecha, finfecha).then(data => {
//             this.subcategorias = data.data;
//             this.chartBarChart();
//         });
        
//         this.productoService.ExisTodas().then(data => {
//             this.productos = data.data;
//             this.chartDoughnutChart();
//         });

//         this.productoService.Todas(iniciofecha, finfecha).then(data => {
//             this.productos = data.data;
//             this.chartLineChart();
//         });
      
//     }

//     mostrartodas(){
//         this.todas();
//     }
    
//     ngOnInit() {
//         this.initCharts();
//         this.sedeService.getList().then(data => this.sedes = data);

//         const sucursalid =  parseInt(localStorage.getItem('sucursal'));

//         let iniciofecha = this.formatDate(this.inicio);
//         let finfecha = this.formatDate(this.fin)

//         this.categoriaService.CategoriaTotal(sucursalid,iniciofecha, finfecha).then(data => {
//             this.categorias = data.data;
//             this.chartPieChart();
//         });

//         this.subcategoriaService.SubcategoriaTotal(sucursalid,iniciofecha, finfecha).then(data => {
//             this.subcategorias = data.data;
//             this.chartBarChart();
//         });
        
//         this.productoService.Existencia(sucursalid).then(data => {
//             this.productos = data.data;
//             this.chartDoughnutChart();
//         });

//         this.productoService.Ventas(sucursalid,iniciofecha, finfecha).then(data => {
//             this.productos = data.data;
//             this.chartLineChart();
//         });
//     }

//     chartLineChart() {
//         const documentStyle = getComputedStyle(document.documentElement);
//         const textColor = documentStyle.getPropertyValue('--text-color');
//         const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
//         const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
        
//         if (Array.isArray(this.productos)) {
//             this.lineData = {
//                 labels: this.productos.map(producto => producto.semana || 'No hay'),
//                 datasets: [
//                     {
//                         label: 'Ventas',
//                         data: this.productos.map(producto => parseInt(producto.totalVentas)),
//                         fill: false,
//                         backgroundColor: documentStyle.getPropertyValue('--primary-500'),
//                         borderColor: documentStyle.getPropertyValue('--primary-500'),
//                         tension: .4
//                     }]
//             };
        
//             this.lineOptions = {
//                 plugins: {
//                     legend: {
//                         labels: {
//                             fontColor: textColor
//                         }
//                     }
//                 },
//                 scales: {
//                     x: {
//                         ticks: {
//                             color: textColorSecondary
//                         },
//                         grid: {
//                             color: surfaceBorder,
//                             drawBorder: false
//                         }
//                     },
//                     y: {
//                         ticks: {
//                             color: textColorSecondary
//                         },
//                         grid: {
//                             color: surfaceBorder,
//                             drawBorder: false
//                         }
//                     },
//                 }
//             };
            
//         } else {
//             console.error('no funciona');
//         }
//     }

//     chartPieChart() {
//     const documentStyle = getComputedStyle(document.documentElement);
//     const textColor = documentStyle.getPropertyValue('--text-color');
//     const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
    
//     if (Array.isArray(this.categorias)) {
//         const colors = this.categorias.map((_, index) => `hsl(${index * 40}, 100%, 60%)`); 

//         this.pieData = {
//             labels: this.categorias.map(categoria => categoria.categoria || 'No hay'),
//             datasets: [
//                 {
//                     data: this.categorias.map(categoria => parseInt(categoria.totalVentas)),
//                     backgroundColor: colors,
//                     hoverBackgroundColor: colors
//                 }]
//         };
    
//         this.pieOptions = {
//             plugins: {
//                 legend: {
//                     labels: {
//                         usePointStyle: true, 
//                         color: textColor
//                     }
//                 }
//             }
//         };
        
//     } else {
//         console.error('no funciona');
//     }
// }
// chartBarChart() {
//     const documentStyle = getComputedStyle(document.documentElement);
//     const textColor = documentStyle.getPropertyValue('--text-color');
//     const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
  
//     if (Array.isArray(this.subcategorias)) {
//       const colors = this.subcategorias.map(() => chroma.random());
  
//       this.barData = {
//         labels: this.subcategorias.map(subcategoria => subcategoria.subcategoria || 'No hay'),
//         datasets: [
//           {
//             label: 'Total Ventas',
//             backgroundColor: colors,
//             borderColor: colors,
//             borderWidth: 2,
//             hoverBackgroundColor: colors, 
//             hoverBorderColor: colors, 
//             data: this.subcategorias.map(subcategoria => parseInt(subcategoria.totalVentas))
//           }
//         ]
//       };
  
//       this.barOptions = {
//         plugins: {
//             legend: {
//                 labels: {
//                     fontColor: textColor
//                 }
//             }
//         },
//         scales: {
//             x: {
//                 ticks: {
//                     color: textColor,
//                     font: {
//                         weight: 500
//                     }
//                 },
//                 grid: {
//                     display: false,
//                     drawBorder: false
//                 }
//             },
//             y: {
//                 ticks: {
//                     color: textColor,
//                     callback: function(value, index, values) {
//                         return value;
//                     }
//                 },
//                 grid: {
//                     color: surfaceBorder,
//                     drawBorder: false
//                 }
//             },
//         }
//     };
    
//     } else {
//       console.error('no funciona');
//     }
//   }

    
//     chartDoughnutChart() {
//         const documentStyle = getComputedStyle(document.documentElement);
//         const textColor = documentStyle.getPropertyValue('--text-color');
//         const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
        
//         if (Array.isArray(this.productos)) {
//             this.siData = {
//                 labels: this.productos.map(producto => producto.producto || 'No hay'),
//                 datasets: [
//                     {
//                         data: this.productos.map(producto => parseInt(producto.cantidad)),
//                         backgroundColor: [
//                             documentStyle.getPropertyValue('--indigo-500'),
//                             documentStyle.getPropertyValue('--purple-500'),
//                             documentStyle.getPropertyValue('--teal-500')
//                         ],
//                         hoverBackgroundColor: [
//                             documentStyle.getPropertyValue('--indigo-400'),
//                             documentStyle.getPropertyValue('--purple-400'),
//                             documentStyle.getPropertyValue('--teal-400')
//                         ]
//                     }]
//             };
        
//             this.pieOptions = {
//                 plugins: {
//                     legend: {
//                         labels: {
//                             usePointStyle: true,
//                             color: textColor
//                         }
//                     }
//                 }
//             };
//         } else {
//             console.error('no funciona');
//         }
//     }
    

//     initCharts() {
//         const documentStyle = getComputedStyle(document.documentElement);
//         const textColor = documentStyle.getPropertyValue('--text-color');
//         const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
//         const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
        
       
       

//         this.radarData = {
//             labels: ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'],
//             datasets: [
//                 {
//                     label: 'My First dataset',
//                     borderColor: documentStyle.getPropertyValue('--indigo-400'),
//                     pointBackgroundColor: documentStyle.getPropertyValue('--indigo-400'),
//                     pointBorderColor: documentStyle.getPropertyValue('--indigo-400'),
//                     pointHoverBackgroundColor: textColor,
//                     pointHoverBorderColor: documentStyle.getPropertyValue('--indigo-400'),
//                     data: [65, 59, 90, 81, 56, 55, 40]
//                 },
//                 {
//                     label: 'My Second dataset',
//                     borderColor: documentStyle.getPropertyValue('--purple-400'),
//                     pointBackgroundColor: documentStyle.getPropertyValue('--purple-400'),
//                     pointBorderColor: documentStyle.getPropertyValue('--purple-400'),
//                     pointHoverBackgroundColor: textColor,
//                     pointHoverBorderColor: documentStyle.getPropertyValue('--purple-400'),
//                     data: [28, 48, 40, 19, 96, 27, 100]
//                 }
//             ]
//         };

//         this.radarOptions = {
//             plugins: {
//                 legend: {
//                     labels: {
//                         fontColor: textColor
//                     }
//                 }
//             },
//             scales: {
//                 r: {
//                     grid: {
//                         color: textColorSecondary
//                     }
//                 }
//             }
//         };
//     }

//     ngOnDestroy() {
//         if (this.subscription) {
//             this.subscription.unsubscribe();
//         }
//     }
    
// }