import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Product } from 'src/app/demo/api/product';
import {Router} from '@angular/router';
import { Table } from 'primeng/table';
import {Compra} from 'src/app/Models/CompViewModel'
import { ServiceComp } from 'src/app/Service/service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatExpansionPanel } from '@angular/material/expansion';

@Component({

    templateUrl: './compras.component.html',
    providers: [ConfirmationService, MessageService]

})
export class CompraDemoComponent implements OnInit {
    compra!:Compra[];
    modalButtonLabel: string = 'Guardar';

    statuses: any[] = [];
    products: Product[] = [];
    rowGroupMetadata: any;
    activityValues: number[] = [0, 100];
    isExpanded: boolean = false;
    formfac: FormGroup;
    modalTitle: string = 'Nuevo Registro';
    @ViewChild('panel') panel: MatExpansionPanel;

    idFrozen: boolean = false;
    loading: boolean = false;
    @ViewChild('filter') filter!: ElementRef;
    @ViewChild('dt') dataTable!: Table;
    constructor(private service: ServiceComp, private router: Router, private messageService: MessageService,
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
            this.compra = data;
        },error=>{
          console.log(error);
        });
     }

     togglePanel(action: string): void {
        if (action === 'new') {
            this.formfac.reset();
            this.modalTitle= "Nuevo Registro";
            this.modalButtonLabel = 'Guardar';
            
            if (!this.panel.expanded) {
                this.panel.open();
            }
        } else {
            this.panel.toggle();  // Solo alternar sin resetear datos
        }
        this.modalTitle = 'Nuevo Registro';

    }
    
    guardar() {
        if (this.formfac.invalid) {
          return;
        }
        if (this.modalTitle === 'Nuevo Registro') {
          this.agregarEnc();
        } else {
        //   this.actualizar();
        }
      }
      
     agregarEnc(){
        console.log(this.formfac.value)
        const compra : Compra = {
            cli_DNI : this.formfac.value.dnicli,
         
        }
        console.log(this.formfac + 'hola');
        this.service.addModelo(compra).subscribe({
        })
        this.ngOnInit();

     }
     cancelar(){
        this.router.navigate(['app/uikit/comp']);

     }
    
      
}

