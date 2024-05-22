import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Product } from 'src/app/demo/api/product';
import {Router} from '@angular/router';
import { Table } from 'primeng/table';



import { Sede,Fill,SedeEnviar } from 'src/app/Models/SedeViewModel';
import { ServiceService } from 'src/app/Service/Sede.service';

import { CookieService } from 'ngx-cookie-service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MensajeViewModel } from 'src/app/Models/MensajeViewModel';
import { dropDepartamento } from 'src/app/Models/DepartamentoViewModel';

@Component({
  templateUrl: './list-sede.component.html',
  styleUrl: './list-sede.component.scss',
  providers: [ConfirmationService, MessageService, CookieService]
})
export class ListSedeComponent implements OnInit{
  Sede!:Sede[];
   
  MensajeViewModel!: MensajeViewModel[];
  submitted: boolean = false;
  loading: boolean = false;
  departamentos: any[] = [];
  municipios: any[] = [];
  rol: any[] = [];
  fill: any[] = [];
  viewModel: SedeEnviar = new SedeEnviar();
  sedeForm: FormGroup;
  Usua_Id: any = this.cookie.get('ID_Usuario');
  @ViewChild('filter') filter!: ElementRef;

  selectedState: any = null;
  Collapse: boolean = false;
  DataTable: boolean = true;
  Detalles: boolean = false;
  Agregar: boolean = true;
  Contrasenas: boolean = true;
  Valor: string = "";
  staticData = [{}];
  Id_Municipio: string = "";
  deleteProductDialog: boolean = false;
  //Detalle
  Detalle_Codigo: String = "";
  Detalle_Sucursal: String = "";
  Detalle_Telefono: String = "";
  Detalle_Departamento: String = "";
  Detalle_Municipio: String = "";
  UsuarioCreacion: String = "";
  UsuarioModificacion: String = "";
  FechaCreacion: String = "";
  FechaModificacion: String = "";
  ID: String = "";
  MunicipioCodigo: String = "";

  constructor(private service: ServiceService, private router: Router, private cookie: CookieService,private messageService: MessageService
  
  ) { }

  
  ngOnInit(): void {
    this.sedeForm = new FormGroup({
      Sed_Descripcion: new FormControl("",Validators.required),
      Dep_Id: new FormControl("0", [Validators.required]),
      Ciu_Id: new FormControl("0", [Validators.required]),
    });
    this.service.getDropDownsDepartamentos().subscribe((data: dropDepartamento[]) => {
    this.departamentos = data;
    });


      this.service.getSucursal().subscribe((data: any)=>{
          console.log(data);
          this.Sede = data;
      },error=>{
        console.log(error);
      });
   }
  onDepartmentChange(departmentId) {
    if (departmentId !== '0') {
      this.service.getMunicipios(departmentId).subscribe(
        (data: any) => {
          this.municipios = data; 
          this.sedeForm.get('Ciu_Id').setValue('0'); 
        },
        error => {
          console.error('Error fetching municipios:', error);
        }
      );
    } else {
      this.municipios = []; // Clear municipios if the department is invalid or reset
    }
  }
   clear(table: Table, filter: ElementRef) {
    table.clear();
    filter.nativeElement.value = '';
  }
  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }
  

  //Region Collapse
  collapse(){
    this.Collapse= true;
    this.DataTable = false;
    this.Valor = "Agregar";
    this.Agregar= false;
    this.Detalles = false;
  }

  cancelar(){
    this.Collapse= false;
    this.DataTable = true;
    this.Detalles = false;
    this.ngOnInit();
    this.submitted = false;
    this.Agregar= true;
    this.Valor = "";
}

  detalles(codigo){
    this.Collapse= false;
    this.DataTable = false;
    this.Agregar= false;
    this.Detalles = true;
    this.service.getFill(codigo).subscribe({
      next: (data: Fill) => {
         this.Detalle_Codigo = data.sed_Id,
         this.Detalle_Sucursal = data.sed_Descripcion,
         this.Detalle_Municipio = data.ciu_Descipcion,
         this.UsuarioCreacion = data.usuarioCreacion,
         this.UsuarioModificacion = data.usuarioModificacion
         this.FechaCreacion = data.fechaCreacion,
         this.FechaModificacion = data.fechaModificacion
      }
    });
    this.ngOnInit();
}
validarTexto(event: KeyboardEvent) {
  if (!/^[-a-zA-Z\s-]+$/.test(event.key) && event.key !== 'Backspace' && event.key !== 'Tab' && event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') {
      event.preventDefault();
  }
}
ValidarNumero(event: KeyboardEvent) {
  if (!/^[0-9\s-]+$/.test(event.key) && event.key !== 'Backspace' && event.key !== 'Tab' && event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') {
      event.preventDefault();
  }
}

onSubmit() {
  if (this.sedeForm.valid && this.sedeForm.get('Dep_Id').value !== '0' && this.sedeForm.get('Ciu_Id').value !== '0') {
     this.viewModel = this.sedeForm.value;
     //this.viewModel.Usu_ID = this.Usua_Id;
     if (this.Valor == "Agregar") {
      this.service.EnviarSucursal(this.viewModel).subscribe((data: MensajeViewModel[]) => {
          if(data["message"] == "Operación completada exitosamente."){
          this.ngOnInit();
           this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Insertado con Exito', life: 3000 });
           this.Collapse= false;
           this.DataTable = true;
           this.submitted = false;
           this.Detalles = false;
           this.Agregar = true;
          }else{
           this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se logro insertar', life: 3000 });
          }
       })
     } else {
          this.viewModel.Sed_Id= this.ID
          this.service.ActualizarSucursal(this.viewModel).subscribe((data: MensajeViewModel[]) => {
          if(data["message"] == "Operación completada exitosamente."){
            this.ngOnInit();
           this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Actualizado con Exito', life: 3000 });
           this.Collapse= false;
           this.DataTable = true;
           this.Detalles = false;
           this.submitted = false;
           this.Agregar= true;
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

  deleteSelectedProducts(codigo) {
    this.deleteProductDialog = true;
    this.ID = codigo;
    console.log("El codigo es" + codigo);
  }
confirmDelete() {
    this.service.EliminarSucursal(this.ID).subscribe({
        next: (response) => {
            if(response.message == "La accion ha sido existosa"){
               
                this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Eliminado con Exito', life: 3000 });
                this.Collapse= false;
                this.DataTable = true;
                this.Detalles = false;
                this.submitted = false;
                this.deleteProductDialog = false;
                this.ngOnInit();
               }else{
                this.deleteProductDialog = false;
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se logro eliminar', life: 3000 });
               }
        },
    });

}
Fill(codigo) {
    this.service.getFill(codigo).subscribe({
        next: (data: Fill) => {
          this.sedeForm = new FormGroup({
            Sucu_Nombre: new FormControl(data.sed_Descripcion,Validators.required),
            Depa_Codigo: new FormControl(data.dep_Id, [Validators.required]),
            Muni_Codigo: new FormControl(data.ciu_Id, [Validators.required]),
          });
          this.MunicipioCodigo = data.ciu_Id;
          console.log(this.MunicipioCodigo);
          this.service.getMunicipios(data.dep_Id).subscribe(
            (data: any) => {
              this.municipios = data; 
              this.sedeForm.get('Ciu_Id').setValue(this.MunicipioCodigo); 
            }
          );
            this.ID = data.sed_Id;
            this.Collapse= true;
            this.DataTable = false;
            this.Agregar = false;
            this.Detalles = false;
            this.Contrasenas = false;
            this.Valor = "Editar";
        }
      });

}


}