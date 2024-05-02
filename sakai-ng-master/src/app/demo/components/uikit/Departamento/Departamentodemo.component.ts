import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Product } from 'src/app/demo/api/product';
import {Router} from '@angular/router';
import { Table } from 'primeng/table';
import { Departamento } from 'src/app/Models/DepartamentoViewModel';
import { ServiceService } from 'src/app/Service/service.service';
@Component({
    templateUrl: './Departamentodemo.component.html',
    providers: [ConfirmationService, MessageService]
})
export class DepartamentoDemoComponent implements OnInit {
    departamento!:Departamento[];
   

    statuses: any[] = [];

    products: Product[] = [];

    rowGroupMetadata: any;


    activityValues: number[] = [0, 100];

    isExpanded: boolean = false;

    idFrozen: boolean = false;

    loading: boolean = false;

    @ViewChild('filter') filter!: ElementRef;

    constructor(private service: ServiceService, private router: Router
    
    ) { }
  

    ngOnInit(): void {
        this.service.getDepartamentos().subscribe((data: any)=>{
            console.log(data);
            this.departamento = data;
        },error=>{
          console.log(error);
        });
     }
    
    
      
}

