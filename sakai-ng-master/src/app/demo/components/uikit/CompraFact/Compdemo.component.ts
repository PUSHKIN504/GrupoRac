import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Product } from 'src/app/demo/api/product';
import {Router} from '@angular/router';
import { Table } from 'primeng/table';
import {Compra} from 'src/app/Models/CompViewModel'
import { ServiceComp } from 'src/app/Service/service.service';
@Component({
    templateUrl: './Compdemo.component.html',

    providers: [ConfirmationService, MessageService]
})
export class CompraDemoComponent implements OnInit {
    compra!:Compra[];
   

    statuses: any[] = [];

    products: Product[] = [];

    rowGroupMetadata: any;


    activityValues: number[] = [0, 100];

    isExpanded: boolean = false;

    idFrozen: boolean = false;

    loading: boolean = false;

    @ViewChild('filter') filter!: ElementRef;

    constructor(private service: ServiceComp, private router: Router
    
    ) { }
  

    ngOnInit(): void {
        this.service.getCompras().subscribe((data: any)=>{
            console.log(data);
            this.compra = data;
        },error=>{
          console.log(error);
        });
     }
    
    
      
}

