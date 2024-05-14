import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Product } from 'src/app/demo/api/product';
import {Router} from '@angular/router';
import { Table } from 'primeng/table';
import {Marca} from 'src/app/Models/MarcaViewModel'
import { ServiceMarca } from 'src/app/Service/service.service';
import { MatExpansionPanel } from '@angular/material/expansion';
import { ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    templateUrl: './Marcademo.component.html',

    providers: [ConfirmationService, MessageService]
})
export class MarcaDemoComponent implements OnInit {
    modalButtonLabel: string = 'Guardar';
    marca!:Marca[];
    @ViewChild('panel') panel: MatExpansionPanel;
    @ViewChild('dt') dataTable!: Table;
    newMarca: Marca = new Marca();
//Edit
    valor: string = '';
    modalTitle: string = 'Nuevo Registro';
    formMarcas: FormGroup;
    display: boolean = false;
    codigo: string = '';
    selectedMarc:any;
//Edit--End

//eliminar
confirmacionVisible: boolean = false;
MarcaAEliminar: Marca | null = null;
//eliminar--end
    statuses: any[] = [];

    products: Product[] = [];

    rowGroupMetadata: any;


    activityValues: number[] = [0, 100];

    isExpanded: boolean = false;

    idFrozen: boolean = false;

    loading: boolean = false;

    @ViewChild('filter') filter!: ElementRef;

    constructor(private service: ServiceMarca, private router: Router, private cdr: ChangeDetectorRef,
    private messageService: MessageService,
    private fb:FormBuilder, 

    ) {
        this.formMarcas = this.fb.group({
            marca: ['', Validators.required], // Define el control 'marca' con un valor inicial vacío o según lo necesites
            codigo: [''] // Define el control 'codigo' y cualquier otro control necesario
        });

    }


    ngOnInit(): void {
        this.service.getMarca().subscribe((data: any)=>{
            console.log(data);
            this.marca = data;
        },error=>{
          console.log(error);
        });
     }

     togglePanel(action: string): void {
        if (action === 'new') {
            this.formMarcas.reset();
            this.modalTitle= "Nuevo Registro";
            this.modalButtonLabel = 'Guardar';
            this.newMarca = new Marca();  // Resetear el formulario para nueva entrada
            if (!this.panel.expanded) {
                this.panel.open();
            }
        } else {
            this.panel.toggle();  // Solo alternar sin resetear datos
        }
        this.modalTitle = 'Nuevo Registro';

    }
    /*eliminar() {
        if (this.MarcaAEliminar) {
          const idDepartamento = this.MarcaAEliminar.mar_Id;
          this.service.eliminar(idDepartamento).subscribe({
            next: (data) => {
              this.ngOnInit();
              this.confirmacionVisible = false;
              this.messageService.add({severity:'success', summary:'Éxito', detail:'Municipio eliminado correctamente!'});
            },
            error: (e) => {
              console.log(e);
              this.messageService.add({severity:'error', summary:'Error', detail:'Esta municipio no se puede eliminar.'});
            }
          });
        }
      }*/
      cancelarEliminar() {
        this.confirmacionVisible = false;
      }
    cancelar(): void {
        // Aquí puedes realizar alguna acción cuando se hace clic en el botón "Cancelar"
        // Por ejemplo, puedes cerrar el panel de expansión si lo deseas
        this.panel.close(); // Esto cerrará el panel de expansión
    }
    confirmarEliminar(marca: Marca) {
        this.MarcaAEliminar = marca;
        this.confirmacionVisible = true;
        console.log(marca); 
      }
    addDepartamento(): void {
        this.service.addMarca(this.newMarca).subscribe(
            marca => {
                this.marca = [...this.marca, marca];
                this.cdr.detectChanges(); // Forzar la detección de cambios
                this.panel.close();
                this.newMarca = new Marca();
                this.ngOnInit();

            },
            error => {
                console.error('Error al agregar departamento:', error);
            }
        );
    }
    editar(marca: any) {
        // this.depa = "";
        // this.selectedMarc = marca;
        // console.log(this.selectedMarc);
        // // Usar el nombre del departamento en lugar del código
        // this.valor = marca.dept_Descripcion !== null ? marca.dept_Descripcion : '';
        // this.codigo = marca.muni_Id;
        // // this.depa = marca.dept_Descripcion;
        // // console.log(this.depa + ' ' + marca.dept_Id);
        // this.formMarcas = this.fb.group({
        //     marca: marca.nombre
        // });
        this.modalTitle = 'Editar Registro';
        this.modalButtonLabel = 'Actualizar';
        this.panel.open();
        this.selectedMarc = marca;
        this.modalTitle = 'Editar Registro';
        this.modalButtonLabel = 'Actualizar';
        console.log(this.selectedMarc);
    
        this.formMarcas.patchValue({
          codigo: marca.mar_Id,
          marca: marca.mar_Descripcion
        });
        this.display = true;
    
      }


      NuevoModelo(){
        console.log(this.formMarcas.value)
        const marca : Marca = {
            mar_Descripcion : this.formMarcas.value.marca,
         
        }
        console.log(this.formMarcas.value.marca + 'hola');
        this.service.addMarca(marca).subscribe({
          next:(data)=>{
            this.service.getMarca().subscribe(
              (data: any) => {
                console.log(data);
                this.marca = data;
                console.log(this.marca);
                 this.display = false;
            
              },
               error => {
                console.log(error);
              }
            );
       
          },error:(e)=>{}
        })
      }

      actualizar() {
        const idDepartamento = this.selectedMarc.mar_Id;
        const marca: Marca = {
            mar_Id: idDepartamento,
            mar_Descripcion : this.formMarcas.value.marca,
          
        }
        console.log(this.formMarcas.value.marca + 'editmarca');
        console.log(idDepartamento + 'editId');
        this.service.actualizar(marca).subscribe({
          next: (data) => {
            this.service.getMarca();
            this.display = false;
            this.panel.close();
            this.ngOnInit();
            this.messageService.add({severity:'success', summary:'Éxito', detail:'Municipio editado correctamente!'});
          },
          error: (e) => {
            console.log(e);
            this.messageService.add({severity:'error', summary:'Error', detail:'Municipio ya existente.'});
          }
        })
      }
  
      guardar() {
        if (this.formMarcas.invalid) {
          return;
        }
        if (this.modalTitle === 'Nuevo Registro') {
          this.NuevoModelo();
        } else {
          this.actualizar();
        }
      }
    // editar(marca: any) {
    //     // Verifica si el objeto 'marca' no es nulo y tiene la propiedad 'nombre'
    //     if (marca && marca.nombre) {
    //         this.formMarcas.patchValue({
    //             marca: marca.nombre // Asigna el valor de 'nombre' al control 'marca' del formulario
    //         });
    //     }
    //     console.log(marca);
    //     // Otros códigos relacionados con la edición, si es necesario
    //     this.modalTitle = 'Editar Registro';
    //     this.modalButtonLabel = 'Actualizar';
    //     this.panel.open();
    // }
    // editar(marca: any) {

    //     this.valor = marca.mar_Id !== null ? marca.mar_Descripcion : '';
    //     this.codigo = marca.mar_Id;
    //     console.log(marca.mar_Id);
    //     this.formMarcas = this.fb.group({
    //       codigo: [marca.mar_Id],
    //       descripcion: [marca.mar_Descripcion],
    //     });
    //     this.modalTitle = 'Editar Registro';
    //     this.modalButtonLabel = 'Actualizar';
    //     this.panel.open();
    //   }

}

