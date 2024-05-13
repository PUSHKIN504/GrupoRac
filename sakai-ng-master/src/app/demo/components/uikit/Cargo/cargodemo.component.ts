import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Product } from 'src/app/demo/api/product';
import {Router} from '@angular/router';
import { Table } from 'primeng/table';
import {Cargo} from 'src/app/Models/CargoViewModel'
import { ServiceCargo } from 'src/app/Service/service.service';
import { MatExpansionPanel } from '@angular/material/expansion';
@Component({
    templateUrl: './cargodemo.component.html',

    providers: [ConfirmationService, MessageService]
})
export class CargoDemoComponent implements OnInit {
    cargo!:Cargo[];
   

    statuses: any[] = [];

    products: Product[] = [];

    rowGroupMetadata: any;


    activityValues: number[] = [0, 100];

    isExpanded: boolean = false;

    idFrozen: boolean = false;

    loading: boolean = false;

    newDepartamento: Cargo = new Cargo();
    selectedDepartamento: Cargo;
    selectedDepartamentoId: string; 

    @ViewChild('filter') filter!: ElementRef;
    @ViewChild('dt') dataTable!: Table; 
    @ViewChild('panel') panel: MatExpansionPanel;
    
    globalFilter: string;

    constructor(private messageService: MessageService,private service: ServiceCargo, private router: Router, private cdr: ChangeDetectorRef,private confirmationService: ConfirmationService) { }

    loadDepartamentos(): void {
        this.service.getCargo().subscribe((data: Cargo[]) => {
          this.cargo = data;
          if (this.dataTable) {
            this.dataTable.reset();
            this.dataTable.value = this.cargo;
            this.cdr.detectChanges();  // Añade esto
          }
        }, error => {
          console.error('Error al cargar departamentos:', error);
        });
      }

    ngOnInit(): void {
        this.loadDepartamentos();
     }

     // Método para agregar un nuevo departamento
       addDepartamento(): void {
        this.service.insertCargo(this.newDepartamento).subscribe(
          response => {
            this.loadDepartamentos(); // Recarga la lista completa de departamentos
            this.panel.close(); // Cierra el panel
          },
          error => {
            console.error('Error al agregar departamento:', error);
          }
        );
      }

  // Método para actualizar un departamento existente
  updateDepartamento(): void {
    // Usar selectedDepartamentoId para actualizar
    this.service.updateCargo(this.selectedDepartamentoId, this.newDepartamento).subscribe(
        response => {
            this.loadDepartamentos();
            this.panel.close();
        },
        error => {
            console.error('Error al actualizar departamento:', error);
        }
    );
}
showDetails(id: string): void {
  this.service.getCargoForEdit(id).subscribe(
      data => {
          this.selectedDepartamento = data;
          this.newDepartamento = { ...this.selectedDepartamento };
          console.log('Detalles cargados:', this.selectedDepartamento); // Verificar los datos recibidos
          this.cdr.detectChanges();
          if (!this.panel.expanded) {
              this.panel.open();
          }
          this.cdr.detectChanges();
      },
      error => {
          console.error('Error al cargar los detalles:', error);
      }
  );
}


     /* editDepartamento(departamento: Cargo): void {
        this.selectedDepartamentoId = departamento.Crg_ID; // Guardar el ID cuando se edita un departamento
        this.newDepartamento = { ...departamento };
        delete this.newDepartamento.Crg_ID; // Opcional: Eliminar el ID del objeto si no quieres que aparezca en otras partes del formulario

        if (!this.panel.expanded) {
            this.panel.open();
        }
        this.cdr.detectChanges();
    }*/


      confirmDelete(departamentoId: string): void {
        console.log('ID del departamento recibido:', departamentoId); // Esto debería mostrarte el ID recibido
        if (departamentoId) {
            this.selectedDepartamentoId = departamentoId;
            this.confirmationService.confirm({
                message: '¿Estás seguro de que deseas eliminar este departamento?',
                accept: () => {
                    this.deleteDepartamento();
                }
            });
            
        } else {
            console.error("El ID del departamento es undefined");
        }
    }
    
    deleteDepartamento(): void {
        this.service.deleteCargo(this.selectedDepartamentoId).subscribe({
            next: () => {
                this.messageService.add({severity: 'success', summary: 'Éxito', detail: 'Departamento eliminado correctamente'});
                console.log("Llamando a loadDepartamentos después de eliminar");
                this.loadDepartamentos(); // Asegúrate de recargar los datos aquí

            },
            error: error => {
                console.error('Error al eliminar el departamento:', error);
                this.messageService.add({severity: 'error', summary: 'Error', detail: 'No se pudo eliminar el departamento'});
            }
        });
    }
    
      
      // Método actualizado para manejar tanto abrir como limpiar datos
      // En tu componente TypeScript
isCreating: boolean = true;

togglePanel(action: string, departamento?: Cargo): void {
    if (action === 'new') {
      this.isCreating = true; // Establecer para creación
      this.newDepartamento = new Cargo(); // Nuevo departamento vacío
    } else if (action === 'edit' && departamento) {
      this.isCreating = false; // Establecer para actualización
      this.newDepartamento = { ...departamento }; // Clonar los datos para edición
    }
  
    if (!this.panel.expanded) {
      this.panel.open();
    }
  }
  


      onPanelClose(): void {
        this.newDepartamento = new Cargo();  // Resetear el formulario cuando el panel se cierra
        //this.isExpanded = false;
    }
    

     formatCurrency(value: number) {
        return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
    
      
}

