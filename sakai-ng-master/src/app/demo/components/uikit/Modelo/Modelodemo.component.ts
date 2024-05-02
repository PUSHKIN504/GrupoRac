import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Product } from 'src/app/demo/api/product';
import {Router} from '@angular/router';
import { Table } from 'primeng/table';
import { Modelo } from 'src/app/Models/ModeloViewModel';
import { ServiceModelo } from 'src/app/Service/service.service';
@Component({
    templateUrl: './Modelodemo.component.html',
    providers: [ConfirmationService, MessageService]
})
export class ModeloDemoComponent implements OnInit {
    modelo!:Modelo[];
   

    statuses: any[] = [];

    products: Product[] = [];

    rowGroupMetadata: any;


    activityValues: number[] = [0, 100];

    isExpanded: boolean = false;

    idFrozen: boolean = false;

    loading: boolean = false;

    @ViewChild('filter') filter!: ElementRef;

    constructor(private service: ServiceModelo, private router: Router
    
    ) { }
  

    ngOnInit(): void {
        this.service.getModelo().subscribe((data: any)=>{
            console.log(data);
            this.modelo = data;
        },error=>{
          console.log(error);
        });
     }
    
    
      
}

