import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Product } from 'src/app/demo/api/product';
import {Router} from '@angular/router';
import { Table } from 'primeng/table';
import {Compra} from 'src/app/Models/CompViewModel'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatExpansionPanel } from '@angular/material/expansion';
import { CompraService } from 'src/app/Service/compra.service';
import { Vehiculo } from 'src/app/Models/VehiculoViewModel';
import { VehiculoService } from 'src/app/Service/vehiculo.service';
import { Cliente } from 'src/app/Models/ClienteViewModel';
import { ServiceCliente, ServiceModelo } from 'src/app/Service/service.service';
import { Modelo } from 'src/app/Models/ModeloViewModel';

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

    clientes: Cliente[];
    filtered: Cliente[] = [];

    modelos: Modelo[];

    submitted: boolean = false;
    encabezadoDialog: boolean = false;
    detalleDialog: boolean = false;
    encabezado: boolean = false;

    loading: boolean = false;
    rowsPerPageOptions = [5, 10, 20];
    inicio:any;
    fin:any;

    constructor(private CompraService: CompraService,private VehiculoService: VehiculoService,
        private ClienteService: ServiceCliente, private ModeloService: ServiceModelo,
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

        await this.ClienteService.getCliente().subscribe((data: any)=>{
                this.clientes = data;
                console.log(this.clientes)
            },error=>{
              console.log(error);
            });

        await this.ModeloService.getModelo().subscribe((data: any)=>{
            this.modelos = data;
            console.log(this.modelos)
        },error=>{
            console.log(error);
        });           
     }


    async editFactura(compra: Compra){
        const table = document.getElementById('table');
        const factura = document.getElementById('factura');
        this.encabezado = true;
        this.compra = {};
        this.compra = {...compra};

        this.renderer.addClass(table, 'd-none');
        this.renderer.removeClass(factura, 'd-none');

        await this.VehiculoService.FindDetalle(this.compra.com_Id)
            .then(data => {
                this.vehiculos = data;
            }),
            error=>{
                console.log(error);
            };

        this.vehiculos.forEach(element => {
            this.compra.com_Precio += element.com_Precio;
        });
     }

     saveModal(){
        this.submitted = true;

        if (this.vehiculo.veh_Placa?.trim()) {
            if (this.vehiculo.veh_Placa) {
                // @ts-ignore
                this.product.inventoryStatus = this.product.inventoryStatus.value ? this.product.inventoryStatus.value : this.product.inventoryStatus;
                this.products[this.findIndexById(this.product.id)] = this.product;
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
            } else {
                this.product.id = this.createId();
                this.product.code = this.createId();
                this.product.image = 'product-placeholder.svg';
                // @ts-ignore
                this.product.inventoryStatus = this.product.inventoryStatus ? this.product.inventoryStatus.value : 'INSTOCK';
                this.products.push(this.product);
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
            }

            this.products = [...this.products];
            this.productDialog = false;
            this.product = {};
        }
     }

     findIndexById(id: string): number {
        let index = -1;
        for (let i = 0; i < this.vehiculos.length; i++) {
            if (this.vehiculo[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    }

     hideTable(){
        const table = document.getElementById('table');
        const factura = document.getElementById('factura');

        this.renderer.removeClass(table, 'd-none');
        this.renderer.addClass(factura, 'd-none');
     }

     openDialogEncabezado(){
        this.encabezadoDialog = true;
     }

     newDetalle(){
        this.detalleDialog = true;
        this.vehiculo = {};
     }
     editDetalle(vehiculo: Vehiculo){
        this.detalleDialog = true;
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

