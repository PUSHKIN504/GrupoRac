import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Product } from 'src/app/demo/api/product';
import {Router} from '@angular/router';
import { Table } from 'primeng/table';
import { EstadoCivil } from 'src/app/Models/EstadoCivilViewModel';
import { ServiceEstadoCivil } from 'src/app/Service/service.service';
@Component({
    templateUrl: './EstadoCivildemo.component.html',
    providers: [ConfirmationService, MessageService]
})
export class EstadoCivilDemoComponent implements OnInit {
    estadocivil!:EstadoCivil[];
   

    statuses: any[] = [];

    products: Product[] = [];

    rowGroupMetadata: any;


    activityValues: number[] = [0, 100];

    isExpanded: boolean = false;

    idFrozen: boolean = false;

    loading: boolean = false;

    @ViewChild('filter') filter!: ElementRef;

    constructor(private service: ServiceEstadoCivil, private router: Router
    
    ) { }
  

    ngOnInit(): void {
        this.service.getEstadoCivil().subscribe((data: any)=>{
            console.log(data);
            this.estadocivil = data;
        },error=>{
          console.log(error);
        });
     }
    
    
      
}

