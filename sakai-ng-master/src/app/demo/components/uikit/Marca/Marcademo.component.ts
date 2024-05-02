import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Product } from 'src/app/demo/api/product';
import {Router} from '@angular/router';
import { Table } from 'primeng/table';
import {Marca} from 'src/app/Models/MarcaViewModel'
import { ServiceMarca } from 'src/app/Service/service.service';
@Component({
    templateUrl: './Marcademo.component.html',

    providers: [ConfirmationService, MessageService]
})
export class MarcaDemoComponent implements OnInit {
    marca!:Marca[];
   

    statuses: any[] = [];

    products: Product[] = [];

    rowGroupMetadata: any;


    activityValues: number[] = [0, 100];

    isExpanded: boolean = false;

    idFrozen: boolean = false;

    loading: boolean = false;

    @ViewChild('filter') filter!: ElementRef;

    constructor(private service: ServiceMarca, private router: Router
    
    ) { }
  

    ngOnInit(): void {
        this.service.getMarca().subscribe((data: any)=>{
            console.log(data);
            this.marca = data;
        },error=>{
          console.log(error);
        });
     }
    
    
      
}

