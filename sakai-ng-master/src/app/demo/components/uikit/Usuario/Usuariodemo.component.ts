import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Product } from 'src/app/demo/api/product';
import {Router} from '@angular/router';
import { Table } from 'primeng/table';
import { Usuario } from 'src/app/Models/UsuarioViewModel';
import { ServiceUsuario } from 'src/app/Service/service.service';
@Component({
    templateUrl: './Usuariodemo.component.html',
    providers: [ConfirmationService, MessageService]
})
export class UsuarioDemoComponent implements OnInit {
    usuario!:Usuario[];
   

    statuses: any[] = [];

    products: Product[] = [];

    rowGroupMetadata: any;


    activityValues: number[] = [0, 100];

    isExpanded: boolean = false;

    idFrozen: boolean = false;

    loading: boolean = false;

    @ViewChild('filter') filter!: ElementRef;

    constructor(private service: ServiceUsuario, private router: Router
    
    ) { }
  

    ngOnInit(): void {
        this.service.getUsuario().subscribe((data: any)=>{
            console.log(data);
            this.usuario = data;
        },error=>{
          console.log(error);
        });
     }
    
    
      
}

