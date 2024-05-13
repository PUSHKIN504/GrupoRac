import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Product } from 'src/app/demo/api/product';
import {Router} from '@angular/router';
import { Table } from 'primeng/table';
import {Compra} from 'src/app/Models/CompViewModel'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatExpansionPanel } from '@angular/material/expansion';
import { CompraService } from 'src/app/Service/compra.service';

@Component({

    templateUrl: './compras.component.html',
    providers: [ConfirmationService, MessageService]

})
export class CompraDemoComponent implements OnInit {
    compra:Compra[];
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

    constructor(private service: CompraService, private router: Router, private messageService: MessageService,
        private fb:FormBuilder,
    
    ) { 
        // this.formfac = this.fb.group({
        //     dnicli: ['', Validators.required],
        //     cliente: [''], 
        // });
    }
   

    ngOnInit(): void {
        this.service.List()
            .then(data => {
                this.compra = data;
                console.log(data)
            }),
            error=>{
                console.log(error);
            };
     }

    //  togglePanel(action: string): void {
    //     if (action === 'new') {
    //         this.formfac.reset();
    //         this.modalTitle= "Nuevo Registro";
    //         this.modalButtonLabel = 'Guardar';
            
    //         if (!this.panel.expanded) {
    //             this.panel.open();
    //         }
    //     } else {
    //         this.panel.toggle();  // Solo alternar sin resetear datos
    //     }
    //     this.modalTitle = 'Nuevo Registro';

    // }

    //  cancelar(){
    //     this.router.navigate(['app/uikit/comp']);

    //  }
}

