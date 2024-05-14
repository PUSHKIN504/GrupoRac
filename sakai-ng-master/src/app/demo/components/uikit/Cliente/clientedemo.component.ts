import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Product } from 'src/app/demo/api/product';
import {Router} from '@angular/router';
import { Table } from 'primeng/table';
import {Cliente} from 'src/app/Models/ClienteViewModel'
import { ServiceCliente } from 'src/app/Service/service.service';
@Component({
    templateUrl: './clientedemo.component.html',

    providers: [ConfirmationService, MessageService]
})
export class ClienteDemoComponent implements OnInit {
    cliente!:Cliente[];
   

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

    constructor(private service: ServiceCliente, private router: Router
    
    ) { }
  

    ngOnInit(): void {
        this.service.getCliente().subscribe((data: any)=>{
            console.log(data);
            this.cliente = data;
        },error=>{
          console.log(error);
        });
     }
    

     formatCurrency(value: number) {
        return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
    
      
}

