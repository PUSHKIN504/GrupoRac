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
   
    newDepartamento: Departamento = new Departamento();
    @ViewChild('panel') panel: MatExpansionPanel;
    

    statuses: any[] = [];

    products: Product[] = [];

    rowGroupMetadata: any;


    activityValues: number[] = [0, 100];

    isExpanded: boolean = false;

    idFrozen: boolean = false;

    loading: boolean = false;

    @ViewChild('filter') filter!: ElementRef;
    globalFilter: string;

    constructor(private service: ServiceService,private cdr: ChangeDetectorRef, private router: Router
    
    ) { }
  

    ngOnInit(): void {
        this.service.getDepartamentos().subscribe((data: any)=>{
            console.log(data);
            this.departamento = data;
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
      
    

    togglePanel(): void {
        this.panel.toggle(); // Alternar la apertura y cierre del panel
      }

      onPanelClose(): void {
        this.newDepartamento = new Departamento();  // Resetear el formulario cuando el panel se cierra
      }
      
}

