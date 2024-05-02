import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Product } from 'src/app/demo/api/product';
import {Router} from '@angular/router';
import { Table } from 'primeng/table';
import {Ciudad} from 'src/app/Models/CiudadViewModel'
import { ServiceCiu } from 'src/app/Service/service.service';
@Component({
    templateUrl: './Ciudaddemo.component.html',

    providers: [ConfirmationService, MessageService]
})
export class CiudadDemoComponent implements OnInit {
    ciudad!:Ciudad[];
   

    statuses: any[] = [];

    products: Product[] = [];

    rowGroupMetadata: any;


    activityValues: number[] = [0, 100];

    isExpanded: boolean = false;

    idFrozen: boolean = false;

    loading: boolean = false;

    @ViewChild('filter') filter!: ElementRef;

    constructor(private service: ServiceCiu, private router: Router
    
    ) { }
  

    ngOnInit(): void {
        this.service.getCiudad().subscribe((data: any)=>{
            console.log(data);
            this.ciudad = data;
        },error=>{
          console.log(error);
        });
     }
    
    
      
}

