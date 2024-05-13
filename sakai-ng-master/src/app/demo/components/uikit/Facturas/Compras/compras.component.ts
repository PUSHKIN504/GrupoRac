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
import { ServiceCliente, ServiceModelo } from 'src/app/Service/service.service';
import { Modelo } from 'src/app/Models/ModeloViewModel';
import { CompraService } from 'src/app/Service/compra.service';
import { VehiculoService } from 'src/app/Service/vehiculo.service';

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

    vehiculoInicial: Vehiculo[];

    clientes: Cliente[];
    filtered: Cliente[] = [];

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

     async nuevaFactura(){
        const table = document.getElementById('table');
        const factura = document.getElementById('factura');
    
        this.compra = {};

        this.renderer.addClass(table, 'd-none');
        this.renderer.removeClass(factura, 'd-none');
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
                this.vehiculoInicial = data;
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

                this.calcularPrecio();
            }
            this.vehiculos = [...this.vehiculos];
            this.detalleDialog = false;
            this.vehiculo = {};
        }
     }

     saveModalCompra(){
        this.submitted = true;

        if (this.compra.cli_DNI?.trim()) {
            if (this.compra.cli_DNI) {
               
                // this.compra.cli_Id = this.createId();
                // @ts-ignore
                console.log(this.compra);

                this.compra.com_Creacion = 1;

                this.compras.push(this.compra);

                this.encabezado = true;

                this.calcularPrecio();
            }
            this.compras = [...this.compras];
            this.encabezadoDialog = false;
            this.compra = {};
        }

     }

    async saveFactura(){
        var id;
        console.log("entraFact")
        await this.CompraService.Insert(this.compra)
            .then(result => {
                id =  result.data.CodeStatus;
                console.log(result.data.CodeStatus)
            })
            ,error=>{
                console.log(error);
            };
            
        this.vehiculos.forEach(async element => {
            element.com_Id = id;
            await this.VehiculoService.Insert(element)
            ,error=>{
                console.log(error);
            };
        });
        
    }

     openDeleteDialog(vehiculo: Vehiculo){
        this.deleteDialog = true;
        this.vehiculo = {...vehiculo};
     }

     confirmDelete(){
        this.deleteDialog = false;
        this.vehiculos = this.vehiculos.filter(val => val.veh_Id !== this.vehiculo.veh_Id);
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

