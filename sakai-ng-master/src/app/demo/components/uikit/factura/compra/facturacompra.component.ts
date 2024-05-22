import { Component, OnInit, ViewChild, ElementRef, Renderer2, ChangeDetectorRef } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Product } from 'src/app/demo/api/product';
import {Router} from '@angular/router';
import { Table } from 'primeng/table';
import {Compra} from 'src/app/Models/CompViewModel'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatExpansionPanel } from '@angular/material/expansion';
import { Vehiculo } from 'src/app/Models/VehiculoViewModel';
import { Cliente } from 'src/app/Models/ClienteViewModel';

import { Modelo } from 'src/app/Models/ModeloViewModel';
import { CompraService } from 'src/app/Service/compra.service';
import { VehiculoService } from 'src/app/Service/vehiculo.service';
import { ServiceService } from 'src/app/Service/Cliente.service';
import { ServiceModelo } from 'src/app/Service/service.service';
import jsPDF from 'jspdf';
import { CookieService } from 'ngx-cookie-service';
import { DatePipe } from '@angular/common';
import autoTable from 'jspdf-autotable';

@Component({

    templateUrl: './facturacompra.component.html',
    providers: [ConfirmationService, MessageService]

})
export class FacturaCompraComponent implements OnInit {

    hoy = new Date();

    
    compras:Compra[];
    compra:Compra;
    selectedCompras: Compra[];


    com_Fecha: string;

    vehiculos: Vehiculo[];
    vehiculo: Vehiculo;

    shown: boolean= false;

    insertarFactura: boolean = false;

    insertarVehiculo: boolean = false;

    vehiculosUpdate: Vehiculo[];
    vehiculosDelete: Vehiculo[];
    vehiculosInsert: Vehiculo[];

    cambiosDialog: boolean = false;
    cambios: boolean = false;

    clientes: Cliente[];
    cliente: Cliente;

    filtered: Cliente[] = [];

    emitirDialog: boolean = false;

    modelos: Modelo[];

    submitted: boolean = false;
    encabezadoDialog: boolean = false;
    detalleDialog: boolean = false;
    encabezado: boolean = false;
    deleteDialog: boolean = false;


    loading: boolean = false;
    rowsPerPageOptions = [5, 10, 20];
    inicio:any;
    fin:any;

    constructor(private cdr: ChangeDetectorRef, private CompraService: CompraService,private VehiculoService: VehiculoService,
        private clienteService: ServiceService, private modeloService: ServiceModelo,
        private router: Router, private messageService: MessageService,
        private fb:FormBuilder, private renderer: Renderer2,
        private cookie : CookieService, private datePipe: DatePipe,
    
    ) { 
        // this.formfac = this.fb.group({
        //     dnicli: ['', Validators.required],
        //     cliente: [''], 
        // });
        const today = new Date();
        this.fin = today;
    }
   

    async ngOnInit(){
        
        this.vehiculos = [];
        this.compra = {};
        this.loading = true;

        await this.CompraService.List()
            .then(data => {
                this.compras = data;
                this.loading = false;
                console.log(data)
            })
        
        await this.clienteService.getClientes().subscribe((data: any)=>{
                this.clientes = data;
                console.log(this.clientes)
            },error=>{
              console.log(error);
            });

        await this.modeloService.getModelo().subscribe((data: any)=>{
            this.modelos = data;
            console.log(this.modelos)
        },error=>{
            console.log(error);
        });           
     }

     async nuevaFactura(){
        //visiblidad
        const table = document.getElementById('table');
        const factura = document.getElementById('factura');
        const btnCrear = document.getElementById('btnCrear');
        this.renderer.addClass(btnCrear, 'd-none');
        this.renderer.addClass(table, 'd-none');
        this.renderer.removeClass(factura, 'd-none');
        //visiblidad

        this.insertarFactura = true;
        this.compra = {};
        this.vehiculo = {};
        this.vehiculos = [];

        
        this.encabezadoDialog = true;
     }

    async editFactura(compra: Compra){
        console.log(this.insertarFactura, "insertarboolean");
        //visibilidad
        const table = document.getElementById('table');
        const factura = document.getElementById('factura');
        const btnCrear = document.getElementById('btnCrear');
        this.renderer.addClass(btnCrear, 'd-none');
        this.renderer.addClass(table, 'd-none');
        this.renderer.removeClass(factura, 'd-none');
        //visibilidad

        this.encabezado = true;
        this.compra = {};
        this.compra = {...compra};

        
        console.log(this.compra.com_Estado, "estado");

        this.renderer.addClass(table, 'd-none');
        this.renderer.removeClass(factura, 'd-none');

        await this.VehiculoService.FindDetalle(this.compra.com_Id)
            .then(data => {
                this.vehiculos = data;
                this.vehiculosUpdate = data;
                this.vehiculosInsert = [];
                this.vehiculosDelete = [];
            }),
            error=>{
                console.log(error);
            };
        
        
        
            this.calcularPrecio();
     }

     calcularPrecio(){
        this.compra.com_Precio = 0;

        this.vehiculos.forEach(element => {
            element.veh_Id = this.createId();
            this.compra.com_Precio += element.com_Precio;
        });
     }

    saveModalVehiculo(){
        this.cambios = true;

        this.submitted = true;
        this.cdr.detectChanges(); // Manually trigger change detection

        if (this.vehiculo.veh_Placa?.trim()) {
            if (this.vehiculo.veh_Id) {
                // @ts-ignore
                console.log(this.vehiculo, "editar")
                this.vehiculo.mod_Id = this.findModelByDescripcion(this.vehiculo.mod_Descripcion);
                this.vehiculos[this.findIndexById(this.vehiculo.veh_Id)] = this.vehiculo;

                this.calcularPrecio();
            } else {
                this.vehiculo.veh_Id = this.createId();
                // @ts-ignore
                this.vehiculo.mod_Id = this.findModelByDescripcion(this.vehiculo.mod_Descripcion);
                this.vehiculo.com_Id = this.compra.com_Id;
                this.vehiculo.sed_Id = 1;
                this.vehiculo.veh_Creacion = 2;
                this.vehiculos.push(this.vehiculo);

                this.vehiculosInsert.push(this.vehiculo);

                this.insertarVehiculo = false;

                this.calcularPrecio();
            }
            this.vehiculos = [...this.vehiculos];
            this.detalleDialog = false;
             //visiblidad
                    const vehiculoShow = document.getElementById(`vehiculoShow-${this.vehiculo.veh_Placa}`);
                    const vehiculoInput = document.getElementById(`vehiculoInput-${this.vehiculo.veh_Placa}`);

                    this.renderer.removeClass(vehiculoShow, 'd-none');
                    this.renderer.addClass(vehiculoShow, 'flex');

                    this.renderer.addClass(vehiculoInput, 'd-none');
                    this.renderer.removeClass(vehiculoInput, 'flex');

                    //visiblidad
            this.vehiculo = {};

            
        }
     }

     saveModalCompra(){
        this.cambios = true;

        this.submitted = true;

        if (this.compra.cli_DNI?.trim()) {
            if (this.compra.cli_DNI) {

                // this.compra.cli_Id = this.createId();
                // @ts-ignore
                console.log(this.compra);

                this.compra.com_Creacion = 1;

                // this.compras.push(this.compra);

                this.encabezado = true;

                this.calcularPrecio();
            }
            this.compras = [...this.compras];
            this.encabezadoDialog = false;
        }

     }

     openEmitirDialog(compra: Compra){
        this.emitirDialog = true;
        this.compra = compra;
     }

     async emitirFactura(){
        this.compra.com_Modifica = 2;
        await this.CompraService.Emitir(this.compra)
                    .then(result => {
                        if(result.code == 200){
                            
                            this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Emición ejecutada correctamente', life: 3000 });
                            
                            this.emitirDialog = false;
                        }else{
                            this.messageService.add({ severity: 'warning', summary: 'Advertencia', detail: `Algo salió mal | Código: ${result.code}`, life: 3000 });
                        }
                    })
                    ,error=>{
                        this.messageService.add({ severity: 'error', summary: 'Error', detail: `Algo salió mal | Error: ${error}`, life: 3000 });
                    };
                    console.log(this.compra, "compra")

        await this.VehiculoService.FindDetalle(this.compra.com_Id)
                    .then(result=>{
                        this.vehiculos = result;
                        console.log(result, "result Vehiculos")
                    })
        await this.clienteService.getClientes().subscribe((data: any)=>{
            console.log(data);
            this.clientes = data;
            this.cliente = this.clientes[this.findClienteByDNI(this.compra.cli_DNI)];

        },error=>{
          console.log(error);
        });
    

                        // item.com_Id.toString(),
                        //     item.cli_Id.toString(),
                        //     item.cli_NombreCompleto.toString(),
                        //     item.com_Precio.toString(),

                        const cuerpo = this.vehiculos.map(item => [
                            item.veh_Placa?.toString(),
                            item.mod_Descripcion?.toString(),
                            item.mar_Descripcion?.toString(),
                            item.sed_Descripcion?.toString(),
                            item.com_Id?.toString(),
                            item.com_Precio?.toString(),
                          ]);

                          console.log(cuerpo, 'cuerpo')
                
                          const cuerpoSinPrimerElemento = cuerpo.slice(1);
                
                        //   const total = data.reduce((sum, item) => {
                        //     const itemTotal = parseFloat(item.com_Precio.toString()) || 0; 
                        //     return sum + itemTotal;
                        //       }, 0);
                          
                        //   const totales = total.toFixed(2);
                
                          const img = "assets/layout/images/themes/logo.jpg";
                
                          const doc = new jsPDF({
                            orientation: 'portrait',
                            unit: 'px',
                            format: 'letter'
                          });
                
                        const pageWidth = doc.internal.pageSize.getWidth();
                        const pageHeight = doc.internal.pageSize.getHeight();
                        const margin = 10; 
                        const contentWidth = pageWidth - 2 * margin;
                        const contentHeight = pageHeight - 2 * margin;
                
                        const primaryColor = [146, 8, 8]; 
                        const blackColor = [0, 0, 0]; 
                        const whiteColor = [255, 255, 255]; 
                
                        doc.setDrawColor(primaryColor[0], primaryColor[1], primaryColor[2]);
                
                        doc.line(margin, margin, pageWidth - margin, margin);
                
                        doc.line(pageWidth - margin, margin, pageWidth - margin, pageHeight - margin);
                
                        doc.line(pageWidth - margin, pageHeight - margin, margin, pageHeight - margin);
                
                        doc.line(margin, pageHeight - margin, margin, margin);
                
                        
                        
                        let pageNumber = 1;
                
                        const availableWidth = contentWidth - 30;
                
                        const imgWidth = pageWidth;
                        const imgHeight = 50;
                        doc.addImage(img, 'JPEG', margin - 5, margin - 5, 35, 35); 
                
                        doc.setFontSize(10);
                        doc.setFont(undefined, 'bold');
                        doc.text('Grupo Rac, Sur', imgWidth - margin - 10, margin + 20, { align: 'right' });
                
                        doc.setFontSize(10);
                        doc.setFont(undefined, 'normal');
                        doc.text('Dirección: Avenida Valle de Angeles, Calle 5, \nCholuteca, Francisco Morazán', imgWidth - margin - 10, margin + 30, { align: 'right' });
                        
                        doc.setFontSize(11);
                        doc.setFont(undefined, 'normal');
                        doc.text("Pedido #" + this.compra.com_Id, 16*2 , 80);
                        doc.setFontSize(10);
                        doc.setFont(undefined, 'normal');
                        doc.text("Cliente: " + this.compra.cli_Nombre, 16*2 , 90);
                        doc.setFontSize(10);
                        doc.setFont(undefined, 'normal');
                        doc.text("DNI: " + this.compra.cli_DNI, 16*2 , 100);
                        doc.setFontSize(10);
                        doc.setFont(undefined, 'normal');
                        doc.text("Municipio: " + this.cliente?.ciu_Descripcion, 16*2 , 110);
                        
                        doc.setFontSize(10);
                        doc.setFont(undefined, 'normal');
                        doc.text("Fecha Pedido: " + this.compra.com_Fecha, 140*2 , 90);  
                        doc.setFontSize(10);
                        doc.setFont(undefined, 'normal');
                        doc.text("Impuesto: LPS 0.00", 140*2 , 100);

                        doc.setFontSize(10);
                        doc.setFont(undefined, 'normal');
                        doc.text("Subtotal: LPS " + this.compra.com_Precio + ".00", 140*2, 110);
                        doc.setFontSize(10);
                        doc.setFont(undefined, 'bold');
                        doc.text("Total: LPS " + this.compra.com_Precio + ".00", 140*2, 120);      
                                  
                        const footer = () => {
                            doc.setFontSize(10);
                            doc.setFont(undefined, 'normal');
                            doc.text(String(pageNumber), pageWidth - margin - 10, pageHeight - margin - 10, { align: 'right' });
                            const usuario = this.cookie.get('Empleado');
                            const fechaC = this.datePipe.transform(this.hoy, 'yyyy-MM-dd')
                            doc.text('Usuario:' + usuario,margin + 10, pageHeight - margin - 10 - 10);
                            doc.text('Fecha:' + fechaC,margin + 10, pageHeight - margin - 10);
                        };
                
                        doc.setFontSize(13);
                        doc.setFont(undefined, 'bold');
                        doc.text('Detalle', margin + 10, margin + imgHeight + 80);
                
                        autoTable(doc, {
                            head: [['Placa', 'Modelo', 'Marca', 'Sede', 'Factura de Compra', 'Precio']],
                            body: cuerpo,
                            startY: margin + imgHeight + 90, 
                            margin: { top: margin + 10, bottom: margin + 10, left: margin + 10, right: margin + 10},
                            styles: {
                                fontSize: 10,
                            },
                            headStyles: {
                                fillColor: [146, 8, 8],
                                textColor: [255, 255, 255],
                                halign: 'center',
                                valign: 'middle',
                                fontStyle: 'bold',
                            },
                            columnStyles: {
                                0: { halign: 'center' },
                                1: { halign: 'center' },
                                2: { halign: 'center' },
                                3: { halign: 'center' },
                                4: { halign: 'center' }
                            },
                            theme: 'grid',
                            didDrawPage: (data) => {
                                footer();
                                pageNumber++;
                            }
                        });

                        doc.save(`factura${this.compra.com_Id}.pdf`)
           

        this.ngOnInit();
     }

    async saveFactura(){
        let com_Id;

        if(this.compra.com_Id && this.compra.com_Estado){
            console.log(this.vehiculosInsert,"insert")
            console.log(this.vehiculosDelete, "delete")
            console.log(this.vehiculosUpdate, "update")

            this.compra.com_Modifica = 2;

            await this.CompraService.Update(this.compra)
            .then(result => {
                if(result.code == 200){
                    this.cambios = false;

                    if(this.vehiculos.length < 1){
                        
                        this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Factura Creada Correctamente', life: 3000 });
                        
                        this.ngOnInit();

                        this.cancelarFactura();
                    }
                }else{
                    this.messageService.add({ severity: 'warn', summary: 'Advertencia', detail: `Algo salió mal | Código: ${result.code}`, life: 3000 });
                }
            })
            ,error=>{
                this.messageService.add({ severity: 'error', summary: 'Error', detail: `Algo salió mal | Error: ${error}`, life: 3000 });
            };
            let contador = 0;
            this.vehiculosInsert.forEach(async element => {
                element.com_Id = this.compra.com_Id;

                await this.VehiculoService.Insert(element)
                    .then(result => {
                        if(result.code == 200){
                            
                            this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'insercion Correctamente', life: 3000 });
                            
                            this.ngOnInit();

                            this.cancelarFactura();
                        }else{
                            this.messageService.add({ severity: 'warning', summary: 'Advertencia', detail: `Algo salió mal | Código: ${result.code}`, life: 3000 });
                        }
                    })
                    ,error=>{
                        this.messageService.add({ severity: 'error', summary: 'Error', detail: `Algo salió mal | Error: ${error}`, life: 3000 });
                    };
            });

            this.vehiculosDelete.forEach(async element => {
                await this.VehiculoService.Delete(element.veh_Placa)
                    .then(result => {
                        if(result.code == 200){
                            
                            this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'deletion Correctamente', life: 3000 });
                            
                            this.ngOnInit();

                            this.cancelarFactura();
                        }else{
                            this.messageService.add({ severity: 'warning', summary: 'Advertencia', detail: `Algo salió mal | Código: ${result.code}`, life: 3000 });
                        }
                    })
                    ,error=>{
                        this.messageService.add({ severity: 'error', summary: 'Error', detail: `Algo salió mal | Error: ${error}`, life: 3000 });
                    };
            });
            contador = 0;
            this.vehiculosUpdate.forEach(async element => {
                element.veh_Modifica = 2;

                await this.VehiculoService.Update(element)
                    .then(result => {
                        if(result.code == 200){
                            if(contador == 0){
                                this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'update Correctamente', life: 3000 });
                            }
                            
                            this.ngOnInit();

                            this.cancelarFactura();
                        }else{
                            this.messageService.add({ severity: 'warning', summary: 'Advertencia', detail: `Algo salió mal | Código: ${result.code}`, life: 3000 });
                        }
                    })
                    ,error=>{
                        this.messageService.add({ severity: 'error', summary: 'Error', detail: `Algo salió mal | Error: ${error}`, life: 3000 });
                    };
                
                    contador ++;
            });
        }else{
            await this.CompraService.Insert(this.compra)
            .then(result => {
                if(result.code == 200){
                    this.cambios = false;

                    com_Id = result.data.codeStatus;
                    if(this.vehiculos.length < 1){
                        
                        this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Factura Creada Correctamente', life: 3000 });
                        
                        this.ngOnInit();

                        this.cancelarFactura();

                    }
                }else{
                    this.messageService.add({ severity: 'warn', summary: 'Advertencia', detail: `Algo salió mal | Código: ${result.code}`, life: 3000 });
                }
            })
            ,error=>{
                this.messageService.add({ severity: 'error', summary: 'Error', detail: `Algo salió mal | Error: ${error}`, life: 3000 });
            };
            
            this.vehiculos.forEach(async element => {
                element.com_Id = com_Id;
                await this.VehiculoService.Insert(element)
                    .then(result => {
                        if(result.code == 200){
                            
                            this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Factura Creada Correctamente', life: 3000 });
                            
                            this.ngOnInit();

                            this.cancelarFactura();


                        }else{
                            this.messageService.add({ severity: 'warning', summary: 'Advertencia', detail: `Algo salió mal | Código: ${result.code}`, life: 3000 });
                        }
                    })
                    ,error=>{
                        this.messageService.add({ severity: 'error', summary: 'Error', detail: `Algo salió mal | Error: ${error}`, life: 3000 });
                    };
            });


        }        
    }

     openDeleteDialog(vehiculo: Vehiculo){
        this.cambios = true;
        this.deleteDialog = true;
        this.vehiculo = {...vehiculo};
     }

     confirmDelete(){
        this.cambios = true;

        this.deleteDialog = false;
        
        this.vehiculosDelete.push(this.vehiculo);
        
        this.vehiculos = this.vehiculos.filter(val => val.veh_Id !== this.vehiculo.veh_Id);
        
        this.vehiculosUpdate = this.vehiculosUpdate.filter(val => val.veh_Id !== this.vehiculo.veh_Id);
        
        this.vehiculo = {};
        this.calcularPrecio();

     }

     findIndexById(id: string): number {
        let index = -1;
        for (let i = 0; i < this.vehiculos.length; i++) {
            if (this.vehiculos[i].veh_Id === id) {
                index = i;
                break;
            }
        }

        return index;
    }

    findModelByDescripcion(descripcion: string): number {
        let index = -1;
        for (let i = 0; i < this.modelos.length; i++) {
            if (this.modelos[i].mod_Descripcion === descripcion) {
                index = this.modelos[i].mod_Id;
                break;
            }
        }
        return index;
    }

    findClienteByDNI(dni: string): number {
        let index = -1;
        for (let i = 0; i < this.clientes.length; i++) {
            if (this.clientes[i].cli_DNI === dni) {
                index = parseInt(this.clientes[i].cli_Id.toString());
                console.log(index, "cli_Index")
                break;
            }
        }
        return index;
    }

    createId(): string {
        let id = '';
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }
    confirmCancelar(){
        this.cambios = false;
        this.cambiosDialog = false;
        this.cancelarFactura();
    }
    
     cancelarFactura(){
        if(this.cambios){
            this.cambiosDialog = true;
        }else{
            //visbilidad
            const table = document.getElementById('table');
            const factura = document.getElementById('factura');
            const btnCrear = document.getElementById('btnCrear');
            this.renderer.removeClass(btnCrear, 'd-none');
            this.renderer.removeClass(table, 'd-none');
            this.renderer.addClass(factura, 'd-none');
            //visbilidad


            this.insertarFactura = false;

            this.encabezado = false;
            this.compra = {}
        }       
     }

     openDialogEncabezado(){
        this.encabezadoDialog = true;
     }

     newDetalle(){
        this.detalleDialog = true;
        this.insertarVehiculo = true;
        this.vehiculo = {};
     }

     editDetalle(vehiculo: Vehiculo){
        //visiblidad
        const vehiculoShow = document.getElementById(`vehiculoShow-${vehiculo.veh_Placa}`);
        const vehiculoInput = document.getElementById(`vehiculoInput-${vehiculo.veh_Placa}`);

        this.renderer.addClass(vehiculoShow, 'd-none');
        this.renderer.removeClass(vehiculoShow, 'flex');

        this.renderer.removeClass(vehiculoInput, 'd-none');
        this.renderer.addClass(vehiculoInput, 'flex');

        //visiblidad

        this.detalleDialog = true;
        this.vehiculo = {}
        this.vehiculo = {...vehiculo};

     }

     hideDialog(){
        this.detalleDialog = false;
        this.encabezadoDialog = false;
     }

     formatDate(date: Date): string {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); 
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    filter(event: any) {

        const filtered: any[] = [];
        const query = event.query;
        for (let i = 0; i < this.clientes.length; i++) {
            const clientes = this.clientes[i].cli_DNI;
            if (clientes.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filtered.push(clientes);
            }
        }

        this.filtered = filtered;
    }


    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
}

