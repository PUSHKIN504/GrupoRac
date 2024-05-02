import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Product } from 'src/app/demo/api/product';
import {Router} from '@angular/router';
import { Table } from 'primeng/table';
import { Vehiculo } from 'src/app/Models/VehiculoViewModel';
import { ServiceVeh } from 'src/app/Service/service.service';
@Component({
    templateUrl: './Vehiculodemo.component.html',
    providers: [ConfirmationService, MessageService]
})
export class VehiculoDemoComponent implements OnInit {
    vehiculo!:Vehiculo[];
   

    statuses: any[] = [];

    products: Product[] = [];

    rowGroupMetadata: any;


    activityValues: number[] = [0, 100];

    isExpanded: boolean = false;

    idFrozen: boolean = false;

    loading: boolean = false;

    @ViewChild('filter') filter!: ElementRef;

    constructor(private service: ServiceVeh, private router: Router
    
    ) { }
  

    ngOnInit(): void {
        this.service.getVeh().subscribe((data: any)=>{
            console.log(data);
            this.vehiculo = data;
        },error=>{
          console.log(error);
        });
     }
    
    
      
}

