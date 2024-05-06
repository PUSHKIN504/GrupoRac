import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Product } from 'src/app/demo/api/product';
import {Router} from '@angular/router';
import { Table } from 'primeng/table';
import { Departamento } from 'src/app/Models/DepartamentoViewModel';
import { ServiceService } from 'src/app/Service/service.service';
import { MatExpansionPanel } from '@angular/material/expansion';

import { ChangeDetectorRef } from '@angular/core';

@Component({
    templateUrl: './Departamentodemo.component.html',
    providers: [ConfirmationService, MessageService]
})
export class DepartamentoDemoComponent implements OnInit {
    departamento!:Departamento[];
    selectedDepartamento: Departamento;
   
    newDepartamento: Departamento = new Departamento();
    @ViewChild('panel') panel: MatExpansionPanel;
    //departamento: departamento[] = [];
    statuses: any[] = [];
    products: Product[] = [];
    rowGroupMetadata: any;
    activityValues: number[] = [0, 100];
    isExpanded: boolean = false;
    idFrozen: boolean = false;
    loading: boolean = false;
    @ViewChild('filter') filter!: ElementRef;
    @ViewChild('dt') dataTable!: Table; 
    globalFilter: string;

    constructor(private service: ServiceService,private cdr: ChangeDetectorRef, private router: Router
    
    ) { }
  

    ngOnInit(): void {
        this.service.getDepartamentos().subscribe((data: any)=>{
            console.log(data);
            this.departamento = data;
            if (this.dataTable) {
                this.dataTable.reset(); // Reset table state
                this.dataTable.value = this.departamento; // Set data to the table
            }

        },error=>{
          console.log(error);
        });
     }    
    
     addDepartamento(): void {
        this.service.addDepartamento(this.newDepartamento).subscribe(
            departamento => {
                this.departamento = [...this.departamento, departamento];
                this.cdr.detectChanges(); // Forzar la detección de cambios
                this.panel.close();
                this.newDepartamento = new Departamento();
                this.ngOnInit();
                
            },
            error => {
                console.error('Error al agregar departamento:', error);
            }
        );
    }

    showDetails(id: string): void {
        this.service.getDepartamentoById(id).subscribe(
          data => {
            this.selectedDepartamento = data;
            console.log('Detalles cargados:', this.selectedDepartamento);
          },
          error => {
            console.error('Error al cargar los detalles:', error);
          }
        );
      }

      /*editDepartamento(departamento: Departamento): void {
        this.newDepartamento = { ...departamento };  // Clonar los datos para edición
        this.togglePanel();  // Asegurar que el panel se abra si está cerrado
      }*/
      editDepartamento(departamento: Departamento): void {
        this.newDepartamento = { ...departamento };  // Clonar los datos para edición
        if (!this.panel.expanded) {
            this.panel.open();  // Asegurar que el panel se abra si está cerrado
        }
    }
    
      
    /*togglePanel(): void {
        this.panel.toggle(); // Alternar la apertura y cierre del panel
      }*/

      // Método actualizado para manejar tanto abrir como limpiar datos
togglePanel(action: string): void {
    if (action === 'new') {
        this.newDepartamento = new Departamento();  // Resetear el formulario para nueva entrada
        if (!this.panel.expanded) {
            this.panel.open();
        }
    } else {
        this.panel.toggle();  // Solo alternar sin resetear datos
    }
}


      onPanelClose(): void {
        this.newDepartamento = new Departamento();  // Resetear el formulario cuando el panel se cierra
        //this.isExpanded = false;
    }
      
      formatCurrency(value: number) {
        return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
}

