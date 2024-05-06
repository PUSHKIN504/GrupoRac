import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Product } from 'src/app/demo/api/product';
import {Router} from '@angular/router';
import { Table } from 'primeng/table';
import {Marca} from 'src/app/Models/MarcaViewModel'
import { ServiceMarca } from 'src/app/Service/service.service';
import { MatExpansionPanel } from '@angular/material/expansion';
import { ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
    templateUrl: './Marcademo.component.html',

    providers: [ConfirmationService, MessageService]
})
export class MarcaDemoComponent implements OnInit {
    modalButtonLabel: string = 'Guardar';
    marca!:Marca[];
    @ViewChild('panel') panel: MatExpansionPanel;
    @ViewChild('dt') dataTable!: Table; 
    newMarca: Marca = new Marca();
//Edit   
    valor: string = '';
    modalTitle: string = 'Nuevo Registro';
    formMarcas: FormGroup;
    display: boolean = false;
    codigo: string = '';
//Edit--End
    statuses: any[] = [];

    products: Product[] = [];

    rowGroupMetadata: any;


    activityValues: number[] = [0, 100];

    isExpanded: boolean = false;

    idFrozen: boolean = false;

    loading: boolean = false;

    @ViewChild('filter') filter!: ElementRef;

    constructor(private service: ServiceMarca, private router: Router, private cdr: ChangeDetectorRef, 
        private fb:FormBuilder
    
    ) { }
  

    ngOnInit(): void {
        this.service.getMarca().subscribe((data: any)=>{
            console.log(data);
            this.marca = data;
        },error=>{
          console.log(error);
        });
     }
    
     togglePanel(action: string): void {
        if (action === 'new') {
            this.newMarca = new Marca();  // Resetear el formulario para nueva entrada
            if (!this.panel.expanded) {
                this.panel.open();
            }
        } else {
            this.panel.toggle();  // Solo alternar sin resetear datos
        }
    }

    addDepartamento(): void {
        this.service.addMarca(this.newMarca).subscribe(
            marca => {
                this.marca = [...this.marca, marca];
                this.cdr.detectChanges(); // Forzar la detección de cambios
                this.panel.close();
                this.newMarca = new Marca();
                this.ngOnInit();
                
            },
            error => {
                console.error('Error al agregar departamento:', error);
            }
        );
    }

    editar(marca: any) {
        
        this.valor = marca.mar_Id !== null ? marca.mar_Descripcion : '';
        this.codigo = marca.mar_Id;
        console.log(marca.mar_Id);
        this.formMarcas = this.fb.group({
          codigo: [marca.mar_Id],
          descripcion: [marca.mar_Descripcion],
        });
        this.modalTitle = 'Editar Registro';
        this.modalButtonLabel = 'Actualizar';
        this.display = true;
      }
      
}

