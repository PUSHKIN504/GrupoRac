import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Product } from 'src/app/demo/api/product';
import {Router} from '@angular/router';
import { Table } from 'primeng/table';
import { Sede } from 'src/app/Models/SedeViewModel';
import { ServiceSede } from 'src/app/Service/service.service';
@Component({
    templateUrl: './Sededemo.component.html',
    providers: [ConfirmationService, MessageService]
})
export class SedeDemoComponent implements OnInit {
    sede!:Sede[];
   

    statuses: any[] = [];

    products: Product[] = [];

    rowGroupMetadata: any;


    activityValues: number[] = [0, 100];

    isExpanded: boolean = false;

    idFrozen: boolean = false;

    loading: boolean = false;

    @ViewChild('filter') filter!: ElementRef;

    constructor(private service: ServiceSede, private router: Router
    
    ) { }
  

    ngOnInit(): void {
        this.service.getSede().subscribe((data: any)=>{
            console.log(data);
            this.sede = data;
        },error=>{
          console.log(error);
        });
     }
    
    
      
}

