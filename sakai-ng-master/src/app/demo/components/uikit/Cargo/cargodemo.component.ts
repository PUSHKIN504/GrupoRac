import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Product } from 'src/app/demo/api/product';
import {Router} from '@angular/router';
import { Table } from 'primeng/table';
import {Cargo} from 'src/app/Models/CargoViewModel'
import { ServiceCargo } from 'src/app/Service/service.service';
@Component({
    templateUrl: './cargodemo.component.html',

    providers: [ConfirmationService, MessageService]
})
export class CargoDemoComponent implements OnInit {
    cargo!:Cargo[];
   

    statuses: any[] = [];

    products: Product[] = [];

    rowGroupMetadata: any;


    activityValues: number[] = [0, 100];

    isExpanded: boolean = false;

    idFrozen: boolean = false;

    loading: boolean = false;

    @ViewChild('filter') filter!: ElementRef;

    constructor(private service: ServiceCargo, private router: Router
    
    ) { }
  

    ngOnInit(): void {
        this.service.getCargo().subscribe((data: any)=>{
            console.log(data);
            this.cargo = data;
        },error=>{
          console.log(error);
        });
     }
    
    
      
}

