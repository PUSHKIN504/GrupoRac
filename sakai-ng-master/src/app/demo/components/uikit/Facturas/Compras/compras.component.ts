import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
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

@Component({

    templateUrl: './compras.component.html',
    providers: [ConfirmationService, MessageService]

})
export class CompraDemoComponent implements OnInit {
    compras:Compra[];
    compra:Compra;
    com_Fecha: string;

    vehiculos: Vehiculo[];
    vehiculo: Vehiculo;


    insertarFactura: boolean = false;

    insertarVehiculo: boolean = false;

    vehiculosUpdate: Vehiculo[];
    vehiculosDelete: Vehiculo[];
    vehiculosInsert: Vehiculo[];

    cambiosDialog: boolean = false;
    cambios: boolean = false;

    clientes: Cliente[];
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

    constructor(private CompraService: CompraService,private VehiculoService: VehiculoService,
        private clienteService: ServiceService, private modeloService: ServiceModelo,
        private router: Router, private messageService: MessageService,
        private fb:FormBuilder, private renderer: Renderer2
    
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

        if (this.vehiculo.veh_Placa?.trim()) {
            if (this.vehiculo.veh_Id) {
                // @ts-ignore
                
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
                            
                            this.ngOnInit();

                            this.emitirDialog = false;
                        }else{
                            this.messageService.add({ severity: 'warning', summary: 'Advertencia', detail: `Algo salió mal | Código: ${result.code}`, life: 3000 });
                        }
                    })
                    ,error=>{
                        this.messageService.add({ severity: 'error', summary: 'Error', detail: `Algo salió mal | Error: ${error}`, life: 3000 });
                    };
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
}

