import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Product } from 'src/app/demo/api/product';
import {Router} from '@angular/router';
import { Table } from 'primeng/table';
import { Cliente,ClienteEnviar,Fill } from 'src/app/Models/ClienteViewModel';
import { ServiceService } from 'src/app/Service/Cliente.service';
import { MensajeViewModel } from 'src/app/Models/MensajeViewModel';
import { FormGroup, FormControl,  Validators  } from '@angular/forms';
import { dropDepartamento } from 'src/app/Models/DepartamentoViewModel';
import { dropMunicipio } from 'src/app/Models/CiudadViewModel';
import { dropCargo } from 'src/app/Models/CargoViewModel';
import { dropEstadoCivil } from 'src/app/Models/EstadoCivilViewModel';
import { CookieService } from 'ngx-cookie-service';

@Component({
  templateUrl: './list-cliente.component.html',
  styleUrl: './list-cliente.component.scss',
  providers: [ConfirmationService, MessageService, CookieService]
})
export class ListClienteComponent implements OnInit{
  Cliente!:Cliente[];
    
  MensajeViewModel!: MensajeViewModel[];
  submitted: boolean = false;
  loading: boolean = false;
  departamentos: any[] = [];
  municipios: any[] = [];
  estadocivil: any[] = [];
  cargo: any[] = [];

  rol: any[] = [];
  fill: any[] = [];
  viewModel: ClienteEnviar = new ClienteEnviar();
  clienteForm: FormGroup;
 
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
  Detalle_DNI: String = "";
  Detalle_Codigo: String = "";
  Detalle_Nombre: String = "";
  Detalle_Apellido: String = "";
  Detalle_Sexo: String = "";
  Detalle_Estado: String = "";
  // Detalle_Cargo: String = "";
  Detalle_FechaNac: String = "";
  Detalle_Departamento: String = "";
  Detalle_Municipio: String = "";
  UsuarioCreacion: String = "";
  UsuarioModificacion: String = "";
  FechaCreacion: String = "";
  FechaModificacion: String = "";
  ID: string = "";
  MunicipioCodigo: String = "";
  Usua_Id: any = this.cookie.get('ID_Usuario');
  constructor(private service: ServiceService, private router: Router,   private messageService: MessageService, private cookie: CookieService
  ) { }


  ngOnInit(): void {
    this.clienteForm = new FormGroup({
      Cli_DNI: new FormControl("",Validators.required),
      Cli_Nombre: new FormControl("",Validators.required),
      Cli_Apellido: new FormControl("", Validators.required),
      Cli_Sexo: new FormControl("", Validators.required),
      Cli_FechaNac: new FormControl("", Validators.required),
      Est_ID: new FormControl("", Validators.required),
      Dep_Id: new FormControl("0", [Validators.required]),
      Ciu_Id: new FormControl("0", [Validators.required]),
    });
    this.service.getDropDownsDepartamentos().subscribe((data: dropDepartamento[]) => {
    console.log(data);
    this.departamentos = data;
    });

    this.service.getDropDownsEstado().subscribe((data: dropEstadoCivil[]) => {
      console.log(data);
      this.estadocivil = data;
      });


      this.service.getDropDownCargo().subscribe((data: dropCargo[]) => {
        console.log(data);
        this.cargo = data;
        });


    this.service.getClientes().subscribe((data: any)=>{
        console.log(data);
        this.Cliente = data;
      },error=>{
        console.log(error);
      });
   }

   clear(table: Table, filter: ElementRef) {
    table.clear();
    filter.nativeElement.value = '';
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }
   onDepartmentChange(departmentId) {
    if (departmentId !== '0') {
      this.service.getMunicipios(departmentId).subscribe(
        (data: any) => {
          this.municipios = data; 
          this.clienteForm.get('Ciu_Id').setValue('0'); 
        },
        error => {
          console.error('Error fetching municipios:', error);
        }
      );
    } else {
      this.municipios = []; // Clear municipios if the department is invalid or reset
    }
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
        this.Detalle_DNI = data.cli_DNI,
         this.Detalle_Codigo = data.cli_Id,
         this.Detalle_Nombre = data.cli_Nombre,
         this.Detalle_Apellido = data.cli_Apellido,
         this.Detalle_Sexo = data.cli_Sexo,
         this.Detalle_Estado = data.est_ID,
         //this.Detalle_DNI = data.cli_DNI;
        //  this.Detalle_Cargo = data.carg_Cargo,
         this.Detalle_FechaNac = data.cli_FechaNac,
         this.Detalle_Departamento = data.dep_Descripcion,
         this.Detalle_Municipio = data.ciu_Descripcion,
         this.UsuarioCreacion = data.usuarioCreacion,
         this.UsuarioModificacion = data.usuarioModificacion
         this.FechaCreacion = data.fechaCreacion,
         this.FechaModificacion = data.fechaModificacion
      }
    });
    this.ngOnInit();
}
ValidarNumeros(event: KeyboardEvent) {
  if (!/[0-9]/.test(event.key) && event.key !== 'Backspace' && event.key !== 'Tab') {
      event.preventDefault();
  }
}
//Cerrar Collapse y reiniciar el form
cancelar(){
    this.Collapse= false;
    this.DataTable = true;
    this.Detalles = false;
    this.ngOnInit();
    this.submitted = false;
    this.Agregar= true;
    this.Valor = "";
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
  if (this.clienteForm.valid && this.clienteForm.get('Dep_Id').value !== '0' && this.clienteForm.get('Ciu_Id').value !== '0'&& this.clienteForm.get('Est_ID').value !== '0' ) {
     this.viewModel = this.clienteForm.value;
     this.viewModel.Usu_ID = this.Usua_Id;
     if (this.Valor == "Agregar") {
      this.service.EnviarCliente(this.viewModel).subscribe((data: MensajeViewModel[]) => {
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
     } else {
      this.viewModel.Cli_Id = this.ID
          this.service.ActualizarCliente(this.viewModel).subscribe((data: MensajeViewModel[]) => {
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
    this.service.EliminarCliente(this.ID).subscribe({
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

          this.clienteForm = new FormGroup({
            Cli_DNI: new FormControl(data.cli_DNI,Validators.required),
            Cli_Nombre: new FormControl(data.cli_Nombre,Validators.required),
            Cli_Apellido: new FormControl(data.cli_Apellido, Validators.required),
            Cli_Sexo: new FormControl(data.cli_Sexo, Validators.required),
            Cli_FechaNac: new FormControl(data.cli_FechaNac, Validators.required),
            Est_ID: new FormControl(data.est_ID, Validators.required),
            Dep_Id: new FormControl(data.dep_Id, [Validators.required]),
            Ciu_Id: new FormControl(data.ciu_Id, [Validators.required]),
          });

          this.MunicipioCodigo = data.ciu_Id;
          console.log(this.MunicipioCodigo);
          this.service.getMunicipios(data.dep_Id).subscribe(
            (data: any) => {
              this.municipios = data; 
              this.clienteForm.get('Muni_Codigo').setValue(this.MunicipioCodigo); 
            }
          );
            this.ID = data.cli_Id;
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