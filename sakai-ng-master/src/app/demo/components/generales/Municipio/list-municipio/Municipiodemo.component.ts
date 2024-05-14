import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { Fill,Municipio,MunicipioEnviar } from 'src/app/Models/CiudadViewModel';
import { dropDepartamento } from 'src/app/Models/DepartamentoViewModel';
import { MensajeViewModel } from 'src/app/Models/MensajeViewModel';

import { ServiceService } from 'src/app/Service/Municipio.service';
import { FormGroup, FormControl,  Validators  } from '@angular/forms';
@Component({
    templateUrl: './Municipiodemo.component.html',
    styleUrl: './list-municipio.component.css',
    providers: [ConfirmationService, MessageService]
})
export class MunicipioDemoComponent implements OnInit {
    Municipio!: Municipio[];
    MensajeViewModel!: MensajeViewModel[];
    submitted: boolean = false;
    loading: boolean = false;
    departamentos: any[] = [];
    fill: any[] = [];
    viewModel: MunicipioEnviar = new MunicipioEnviar();
    municipioForm: FormGroup;
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
    Muni: String = "";
    Codigo: String = "";
    Depa: String = "";
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
        //Inicializamos form,drops,lista
        this.municipioForm = new FormGroup({
            Ciu_Id: new FormControl("",Validators.required),
            Ciu_Descripcion: new FormControl("", Validators.required),
            Dep_Id: new FormControl('0', [Validators.required])
          });
        this.service.getDropDownsDepartamentos().subscribe((data: dropDepartamento[]) => {
            this.departamentos = data;
        });
        this.service.getMunicipios().subscribe((data: Municipio[]) => {
            console.log(data);
            this.Municipio = data;
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
    detalles(codigo){
        this.Collapse= false;
        this.DataTable = false;
        this.Agregar= false;
        this.Detalles = true;
        this.service.getDetalles(codigo).subscribe({
            next: (data: Fill) => {
               this.Muni = data.ciu_Descripcion,
               this.Codigo = data.ciu_Id,
               this.Depa = data.departamento,
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
        this.municipioForm = new FormGroup({
            Ciu_Id: new FormControl("",Validators.required),
            Ciu_Descripcion: new FormControl("", Validators.required),
            Dep_Id: new FormControl('0', [Validators.required])
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

    //Insert
    onSubmit() {
    if (this.municipioForm.valid && this.municipioForm.get('Ciu_Id').value !== '0') {
       this.viewModel = this.municipioForm.value;
       if (this.Valor == "Agregar") {
        this.service.EnviarMunicipios(this.viewModel).subscribe((data: MensajeViewModel[]) => {
            if(data["message"] == "Operación completada exitosamente."){
             this.service.getMunicipios().subscribe((data: Municipio[]) => {
                 this.Municipio = data;
             });
             this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Insertado con Exito', life: 3000 });
             this.Collapse= false;
             this.DataTable = true;
             this.submitted = false;
             this.Detalles = false;
             this.Agregar = true;
             this.municipioForm = new FormGroup({
                Ciu_Id: new FormControl("",Validators.required),
                Ciu_Descripcion: new FormControl("", Validators.required),
                Dep_Id: new FormControl('0', [Validators.required])
             });
     
            }else{
             this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se logro insertar', life: 3000 });
            }
            
         })
       } else {
            this.service.ActualizarMunicipios(this.viewModel).subscribe((data: MensajeViewModel[]) => {
            if(data["message"] == "Operación completada exitosamente."){
             this.service.getMunicipios().subscribe((data: Municipio[]) => {
                 this.Municipio = data;
             });
             this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Actualizado con Exito', life: 3000 });
             this.Collapse= false;
             this.DataTable = true;
             this.Detalles = false;
             this.submitted = false;
             this.Agregar = true;
             this.municipioForm = new FormGroup({
                Ciu_Id: new FormControl("",Validators.required),
                Ciu_Descripcion: new FormControl("", Validators.required),
                Dep_Id: new FormControl('0', [Validators.required])
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


    deleteSelectedProducts(codigo) {
        this.deleteProductDialog = true;
        this.ID = codigo;
        console.log("El codigo es" + codigo);
    }
    confirmDelete() {
        this.service.EliminarMunicipios(this.ID).subscribe({
            next: (response) => {
                if(response.message == "La accion ha sido existosa"){
                    this.service.getMunicipios().subscribe((data: Municipio[]) => {
                        this.Municipio = data;
                    });
                    this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Eliminado con Exito', life: 3000 });
                    this.Collapse= false;
                    this.DataTable = true;
                    this.Detalles = false;
                    this.submitted = false;
                    this.Agregar = true;
                    this.municipioForm = new FormGroup({
                        Ciu_Id: new FormControl("",Validators.required),
                        Ciu_Descripcion: new FormControl("", Validators.required),
                        Dep_Id: new FormControl('0', [Validators.required])
                    });
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
                this.municipioForm = new FormGroup({
                    Ciu_Id: new FormControl(data.ciu_Id,Validators.required),
                    Ciu_Descripcion: new FormControl(data.ciu_Descripcion, Validators.required),
                    Dep_Id: new FormControl(data.dep_Id, [Validators.required])
                });
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