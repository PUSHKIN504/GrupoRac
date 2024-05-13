import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Product } from 'src/app/demo/api/product';
import {Router} from '@angular/router';
import { Table } from 'primeng/table';
import { Marca, MarcaEnviar, Fill } from 'src/app/Models/MarcaViewModel';
import { ServiceService } from 'src/app/Service/Marca.service';
import { FormGroup, FormControl,  Validators  } from '@angular/forms';
import { MensajeViewModel } from 'src/app/Models/MensajeViewModel';

@Component({
  templateUrl: './list-marca.component.html',
  styleUrl: './list-marca.component.scss',
  providers: [ConfirmationService, MessageService]
})
export class ListMarcaComponent implements OnInit{
  Marca!:Marca[];
  MensajeViewModel!: MensajeViewModel[];
  submitted: boolean = false;
  loading: boolean = false;
  departamentos: any[] = [];
  fill: any[] = [];
  viewModel: MarcaEnviar = new MarcaEnviar();
  marcaForm: FormGroup;
  @ViewChild('filter') filter!: ElementRef;
  Collapse: boolean = false;
  DataTable: boolean = true;
  Detalles: boolean = false;
  Agregar: boolean = true;
  MunCodigo: boolean = true;
  Valor: string = "";
  staticData = [{}];


  deleteProductDialog: boolean = false;
  //Detalle
  marca: String = "";
  id: string="";
  UsuarioCreacion: String = "";
  UsuarioModificacion: String = "";
  FechaCreacion: String = "";
  FechaModificacion: String = "";
  ID: String = "";

  constructor(
      private service: ServiceService, 
      private router: Router,
      private confirmationService: ConfirmationService, 
      private messageService: MessageService
  ) { 
     
  
  }

  ngOnInit(): void {


    this.marcaForm = new FormGroup({
      Mar_Descripcion: new FormControl("", Validators.required),
    });


      this.service.getMarca().subscribe((data: any)=>{
          console.log(data);
          this.Marca = data;
      },error=>{
        console.log(error);
      });
   }


    
  //Abrir collapse
  collapse(){
    this.Collapse= true;
    this.DataTable = false;
    this.Valor = "Agregar";
    this.Agregar= false;
    this.Detalles = false;
}
detalles(id){
    this.Collapse= false;
    this.DataTable = false;
    this.Agregar= false;
    this.Detalles = true;
    this.service.getFill(id).subscribe({
        next: (data: Fill) => {
           this.marca = data.mar_Descripcion,
           this.UsuarioCreacion = data.usuarioCreacion,
           this.UsuarioModificacion = data.usuarioModificacion
           this.FechaCreacion = data.fechaCreacion,
           this.FechaModificacion = data.fechaModificacion
        }
      });
}
//Cerrar Collapse y reiniciar el form
cancelar(){
    this.Collapse= false;
    this.DataTable = true;
    this.Detalles = false;
    this.marcaForm = new FormGroup({
      Mar_Descripcion: new FormControl("", Validators.required),
    });
    this.submitted = false;
    this.Agregar= true;
    this.MunCodigo=true;
    this.Valor = "";
}
//Funcionan como regex
ValidarNumeros(event: KeyboardEvent) {
    if (!/[0-9]/.test(event.key) && event.key !== 'Backspace' && event.key !== 'Tab') {
        event.preventDefault();
    }
}
validarTexto(event: KeyboardEvent) {

    if (!/^[a-zA-Z\s]+$/.test(event.key) && event.key !== 'Backspace' && event.key !== 'Tab' && event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') {
        event.preventDefault();
    }
}



   onSubmit() {
    this.submitted = true;
    if (this.marcaForm.valid ) {
       this.viewModel = this.marcaForm.value;
       if (this.Valor == "Agregar") {
        this.service.EnviarMarca(this.viewModel).subscribe((data: MensajeViewModel[]) => {
            if(data["message"] == "Operación completada exitosamente."){
             this.service.getMarca().subscribe((data: Marca[]) => {
                 this.Marca = data;
             });
             this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Insertado con Exito', life: 3000 });
             this.Collapse= false;
             this.DataTable = true;
             this.submitted = false;
             this.Detalles = false;
             this.Agregar= true;
           
    this.marcaForm = new FormGroup({
      Mar_Descripcion: new FormControl("", Validators.required),
    });

     
          }else{
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se logro insertar', life: 3000 });
           }
           
        })
      } else {
         this.viewModel.Mar_Id = this.id ;
           this.service.ActualizarMarca(this.viewModel).subscribe((data: MensajeViewModel[]) => {
           if(data["message"] == "Operación completada exitosamente."){
            this.service.getMarca().subscribe((data: Marca[]) => {
                this.Marca = data;
            });
            this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Actualizado con Exito', life: 3000 });
            this.Collapse= false;
            this.DataTable = true;
            this.Detalles = false;
            this.submitted = false;
            this.Agregar= true;
    this.marcaForm = new FormGroup({
      Mar_Descripcion: new FormControl("", Validators.required),
    });

    
           }else{
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se logro actualizar', life: 3000 });
           }
           
        })
      }  
      
   }   
       else 
       {
           this.submitted = true;
       }
   }
 
 
   deleteSelectedProducts(id) {
       this.deleteProductDialog = true;
       this.ID = id;
       console.log("El codigo es" + id);
   }
   confirmDelete() {
       this.service.EliminarMarca(this.ID).subscribe({
           next: (response) => {
               if(response.message == "La accion ha sido existosa"){
                   this.service.getMarca().subscribe((data: Marca[]) => {
                       this.Marca = data;
                   });
                   this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Eliminado con Exito', life: 3000 });
                   this.Collapse= false;
                   this.DataTable = true;
                   this.Detalles = false;
                   this.submitted = false;
                   this.marcaForm = new FormGroup({
                    Mar_Descripcion: new FormControl("", Validators.required),
                  });
                   this.deleteProductDialog = false;
                  }else{
                   this.deleteProductDialog = false;
                   this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se logro eliminar', life: 3000 });
                  }
           },
       });
   
   }
   Fill(id) {
       this.service.getFill(id).subscribe({
           next: (data: Fill) => {
   
            this.marcaForm = new FormGroup({
              Mar_Descripcion: new FormControl(data.mar_Descripcion, Validators.required),
            });
        
               this.id = data.mar_Id;
               this.Collapse= true;
               this.DataTable = false;
               this.Agregar = false;
               this.MunCodigo = false;
               this.Detalles = false;
               this.Valor = "Editar";
           }
         });
 
   }
 
  
  
}
