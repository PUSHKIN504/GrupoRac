import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Product } from 'src/app/demo/api/product';
import {Router} from '@angular/router';
import { Table } from 'primeng/table';
import {Compra} from 'src/app/Models/CompViewModel'
import { ServiceComp } from 'src/app/Service/service.service';
import { MatExpansionPanel } from '@angular/material/expansion';
import { ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
    templateUrl: './ComFdemo.component.html',

    providers: [ConfirmationService, MessageService]
})


export class ComFDemoComponent implements OnInit {
    modalButtonLabel: string = 'Guardar';
    comf!:Compra[];
    @ViewChild('panel') panel: MatExpansionPanel;
    @ViewChild('dt') dataTable!: Table;
    newComF: Compra = new Compra();
//Edit
    valor: string = '';
    modalTitle: string = 'Nuevo Registro';
    formfac: FormGroup;
    display: boolean = false;
    codigo: string = '';
    selectedMarc:any;
//Edit--End
//eliminar
confirmacionVisible: boolean = false;
MarcaAEliminar: Compra | null = null;
//eliminar--end
    statuses: any[] = [];
    products: Product[] = [];
    rowGroupMetadata: any;
    activityValues: number[] = [0, 100];
    isExpanded: boolean = false;
    idFrozen: boolean = false;
    loading: boolean = false;
    @ViewChild('filter') filter!: ElementRef;

    constructor(private service: ServiceComp, private router: Router, private cdr: ChangeDetectorRef,
    private messageService: MessageService,
    private fb:FormBuilder, 

    ) {
        this.formfac = this.fb.group({
            dnicli: ['', Validators.required], // Define el control 'marca' con un valor inicial vacío o según lo necesites
            cliente: [''], // Define el control 'codigo' y cualquier otro control necesario
            
        });

    }
    ngOnInit(): void {
        this.service.getCompras().subscribe((data: any)=>{
            console.log(data);
            this.comf = data;
        },error=>{
          console.log(error);
        });
     }


     agregarEnc(){
        console.log(this.formfac.value)
        const compra : Compra = {
            cli_DNI : this.formfac.value.dnicli,
         
        }
        console.log(this.formfac + 'hola');
        this.service.addModelo(compra).subscribe({
        })
        this.router.navigate(['app/uikit/comp']);
     }
     cancelar(){
        this.router.navigate(['app/uikit/comp']);

     }
}