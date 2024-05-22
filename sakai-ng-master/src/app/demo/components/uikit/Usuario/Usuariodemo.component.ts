import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Product } from 'src/app/demo/api/product';
import {Router} from '@angular/router';
import { Table } from 'primeng/table';
import { Usuario, UsuarioEnviar,Fill } from 'src/app/Models/UsuarioViewModel';
import { ServiceService } from 'src/app/Service/Usuario.service';
import { FormGroup, FormControl,  Validators  } from '@angular/forms';
import { MensajeViewModel } from 'src/app/Models/MensajeViewModel';
import { EmpleadoEnviar, dropEmpleado } from 'src/app/Models/EmpleadoViewModel';
import { dropRol } from 'src/app/Models/RolViewModel';
@Component({
  templateUrl: './Usuariodemo.component.html',
  styleUrl: './list-usuario.component.css',
  providers: [ConfirmationService, MessageService]
})
export class UsuarioDemoComponent {
  usuario!:Usuario[];
  MensajeViewModel!: MensajeViewModel[];
  submitted: boolean = false;
  loading: boolean = false;
  empleados: any[] = [];
  rol: any[] = [];
  fill: any[] = [];
  viewModel: UsuarioEnviar = new UsuarioEnviar();
  usuarioForm: FormGroup;
  @ViewChild('filter') filter!: ElementRef;

  selectedState: any = null;
  Collapse: boolean = false;
  DataTable: boolean = true;
  Detalles: boolean = false;
  Agregar: boolean = true;
  Contrasenas: boolean = true;
  Valor: string = "";
  staticData = [{}];
  
  deleteProductDialog: boolean = false;
  //Detalle
  Detalle_Usuario: String = "";
  Detalle_Correo: String = "";
  Detalle_Administrador: String = "";
  Detalle_Empleado: String = "";
  Detalle_Rol: String = "";
  UsuarioCreacion: String = "";
  UsuarioModificacion: String = "";
  FechaCreacion: String = "";
  FechaModificacion: String = "";
  ID: String = "";
  constructor(private service: ServiceService, private router: Router, private messageService: MessageService) { }


  ngOnInit(): void {
    this.usuarioForm = new FormGroup({
      Usu_Usua: new FormControl("",Validators.required),
      Usu_Correo: new FormControl("",Validators.required),
      Usu_Contra: new FormControl("", Validators.required),
      Usu_Admin: new FormControl(false, [Validators.required]),
      Empl_Id: new FormControl('0', [Validators.required]),
      Rol_Id: new FormControl('0', [Validators.required]),
    });

    this.service.getDropDownEmpleado().subscribe((data: dropEmpleado[]) => {
      this.empleados = data;
    });
    
    this.service.getDropDownRol().subscribe((data: dropRol[]) => {
      this.rol = data;
    });

    this.service.getUsuario().subscribe((data: any)=>{
        console.log(data);
        this.usuario = data;
    },error=>{
      console.log(error);
    });
   }

   collapse(){
    this.Collapse= true;
    this.DataTable = false;
    this.Valor = "Agregar";
    this.Agregar= false;
    this.Detalles = false;
}
detalles(codigo){
  this.Collapse= false;
  this.DataTable = false;
  this.Agregar= false;
  this.Detalles = true;
  this.service.getFill(codigo).subscribe({
      next: (data: Fill) => {
         this.Detalle_Usuario = data.usu_Usua,
         this.Detalle_Correo = data.usu_Correo,
         this.Detalle_Administrador = data.usu_Admin,
         this.Detalle_Rol = data.rol_Descripcion,
         this.Detalle_Empleado = data.empl_Nombre,
         this.UsuarioCreacion = data.usuarioCreacion,
         this.UsuarioModificacion = data.usuarioModificacion
         this.FechaCreacion = data.fechaCreacion,
         this.FechaModificacion = data.fechaModificacion
      }
    });
}
cancelar(){
  this.Collapse= false;
  this.DataTable = true;
  this.Detalles = false;
  this.ngOnInit();
  this.submitted = false;
  this.Agregar= true;
  this.Contrasenas = true;
  this.Valor = "";
}

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
validarTextoNumeros(event: KeyboardEvent) {

  if (!/^[0-9-a-zA-Z.@_\s-]+$/.test(event.key) && event.key !== 'Backspace' && event.key !== 'Tab' && event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') {
      event.preventDefault();
  }
}
onSubmit() {
  if (this.usuarioForm.valid && this.usuarioForm.get('Empl_Id').value !== '0' && this.usuarioForm.get('Rol_Id').value !== '0') {
     this.viewModel = this.usuarioForm.value;
     if (this.Valor == "Agregar") {
      this.service.EnviarUsuario(this.viewModel).subscribe((data: MensajeViewModel[]) => {
          if(data["message"] == "Operación completada exitosamente."){
          this.ngOnInit();
           this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Insertado con Exito', life: 3000 });
           this.Collapse= false;
           this.DataTable = true;
           this.submitted = false;
           this.Detalles = false;
           this.Agregar= true;
          }else{
           this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se logro insertar', life: 3000 });
          }
          
       })
     } else if (this.Valor == "Editar") {
      console.log('Actualizar Usuario:', this.viewModel);  // Debug
          this.viewModel.Usu_ID = this.ID;
          this.service.ActualizarUsuario(this.viewModel).subscribe((data: MensajeViewModel[]) => {
            console.log('Respuesta de ActualizarUsuario:', data);  // Debug
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
    this.service.EliminarUsuario(this.ID).subscribe({
        next: (response) => {
            if(response.message == "La accion ha sido existosa"){
               this.ngOnInit();
                this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Eliminado con Exito', life: 3000 });
                this.Collapse= false;
                this.DataTable = true;
                this.Detalles = false;
                this.submitted = false;
                this.deleteProductDialog = false;
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
          this.usuarioForm = new FormGroup({
            Usu_Usua: new FormControl(data.usu_Usua,Validators.required),
            Usu_Correo: new FormControl(data.usu_Correo,Validators.required),
            Usua_Contraseña: new FormControl("x", Validators.required),
            Usu_Admin: new FormControl(data.usu_Admin, [Validators.required]),
            Empl_Id: new FormControl(data.empl_Id, [Validators.required]),
            Rol_Id: new FormControl(data.rol_Id, [Validators.required]),
          });
            this.ID = data.usu_ID;
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