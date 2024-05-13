import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Product } from 'src/app/demo/api/product';
import {Router} from '@angular/router';
import { Table } from 'primeng/table';
import { Fill, Rol, RolEnviar } from 'src/app/Models/RolViewModel';
import { NodeService } from 'src/app/demo/service/node.service';
import { ServiceService } from 'src/app/Service/Roles.service';
import { TreeNode} from 'primeng/api';
import { FormGroup, FormControl,  Validators  } from '@angular/forms';
import { MensajeViewModel } from 'src/app/Models/MensajeViewModel';
@Component({
  templateUrl: './list-rol.component.html',
  styleUrl: './list-rol.component.scss',
  providers: [ConfirmationService, MessageService]
})
export class ListRolComponent implements OnInit{
  Rol!:Rol[];
  files1: TreeNode[] = [];
  selectedFiles1: TreeNode[] = [];
  MensajeViewModel!: MensajeViewModel[];
  submitted: boolean = false;
  loading: boolean = false;
  empleados: any[] = [];
  rol: any[] = [];
  fill: any[] = [];
  viewModel: RolEnviar = new RolEnviar();
  rolForm: FormGroup;

 
  @ViewChild('filter') filter!: ElementRef;

  selectedState: any = null;
  Collapse: boolean = false;
  DataTable: boolean = true;
  Detalles: boolean = false;
  Agregar: boolean = true;
  Contrasenas: boolean = true;
  Valor: string = "";
  staticData = [{}];
  selectedKeys: string[] = []; ç
  llenado: any = []; 
  deleteProductDialog: boolean = false;
    //Detalle
    Detalle_Rol: String = "";
    UsuarioCreacion: String = "";
    UsuarioModificacion: String = "";
    FechaCreacion: String = "";
    FechaModificacion: String = "";
    ID: String = "";


    Valor1: string = "";
    Valor2: string = "";
  constructor(private service: ServiceService, private router: Router,private nodeService: NodeService,private messageService: MessageService
  
  ) { }


  ngOnInit(): void {
    this.nodeService.getFiles().then(files => this.files1 = files);
    this.rolForm = new FormGroup({
      Rol_Rol: new FormControl("",Validators.required),
    });




      this.service.getRol().subscribe((data: any)=>{
          console.log(data);
          this.Rol = data;
      },error=>{
        console.log(error);
      });
   }

  onNodeSelect(event: any) {
    this.updateSelectedKeys();
  }

  onNodeUnselect(event: any) {
    this.updateSelectedKeys();
  }

  updateSelectedKeys() {
    const excludedKeys = ['0', '100', '101', '102']; 
    this.selectedKeys = this.selectedFiles1
      .map(node => node.key) 
      .filter(key => !excludedKeys.includes(key)); 
  
   
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
  this.service.getDetalles(codigo).subscribe({
      next: (data: Fill) => {
        this.ID = data[0].rol_Id,
        this.Detalle_Rol = data[0].rol_Descripcion,
         this.UsuarioCreacion = data[0].usuarioCreacion,
         this.UsuarioModificacion = data[0].usuarioModificacion
         this.FechaCreacion = data[0].fechaCreacion,
         this.FechaModificacion = data[0].fechaModificacion
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
  this.Valor = "";
  this.selectedFiles1 = []; 
  this.selectedKeys = [];
}

llenar(id){
  this.nodeService.getFiles().then(treeFiles => {
    this.files1 = treeFiles;
    this.service.getDetalles(id).subscribe({
      next: (data: Fill) => {
         this.ID = data[0].rol_Id
         console.log(data[0].rol_Descripcion)
         this.rolForm = new FormGroup({
          Rol_Rol: new FormControl(data[0].rol_Descripcion,Validators.required),
        });
      }
    });
    this.service.getFill(id).subscribe((data) => {
      if (Array.isArray(data)) {
        const pantIds = data.map((item) => item.ptl_Id);
      
        this.markAddedScreens(treeFiles, pantIds); 
      } else {
        console.error("El formato de datos devuelto no es un arreglo.");
      }
    });
    
  },
  
);

  this.Collapse= true;
  this.DataTable = false;
  this.Agregar= false;
  this.Detalles = false;

}
markAddedScreens(treeNodes: TreeNode[], pantIds: number[]) {
  const addedKeys = pantIds.map((id) => id.toString()); 
  console.log(addedKeys)
  this.selectedFiles1 = this.findNodesByKey(treeNodes, addedKeys);
  this.updateSelectedKeys(); 
}

findNodesByKey(nodes: TreeNode[], keys: string[], parent: TreeNode | null = null): TreeNode[] {
  let selected: TreeNode[] = [];

  nodes.forEach((node) => {
    const isSelected = keys.includes(node.key);
    let childrenSelected: TreeNode[] = [];

  
    if (node.children && node.children.length > 0) {
      childrenSelected = this.findNodesByKey(node.children, keys, node);
      selected = selected.concat(childrenSelected);
    }

 
    const allChildrenSelected = node.children && node.children.length > 0 && node.children.every((child) => keys.includes(child.key));
    const hasSelectedChildren = childrenSelected.length > 0;

    if (isSelected || allChildrenSelected) {
      selected.push(node);
      node.expanded = true;
      node.partialSelected = false; 
    } else if (hasSelectedChildren) {
      node.partialSelected = true;
      node.expanded = true;
    } else {
      node.partialSelected = false; 
    }

  
    if (parent) {
      parent.expanded = true;

     
      parent.partialSelected = parent.partialSelected || hasSelectedChildren;

      if (allChildrenSelected) {
        parent.partialSelected = true;
      }
    }
  });


  if (parent === null) {

    const expectedCount = nodes.reduce((count, node) => count + 1 + (node.children ? node.children.length : 0), 0);

    if (keys.length === 15) {
      nodes.forEach((node) => {
        node.partialSelected = false;
        if (!selected.includes(node)) {
          selected.push(node);
        }
      });
    }
  }

  return selected;
}


validarTexto(event: KeyboardEvent) {

  if (!/^[a-zA-Z\s]+$/.test(event.key) && event.key !== 'Backspace' && event.key !== 'Tab' && event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') {
      event.preventDefault();
  }
}onSubmit() {
  if (this.rolForm.valid) {
     this.viewModel.txtRol = this.rolForm.get('Rol_Rol').value;
     this.viewModel.pantallasSeleccionadas = this.selectedKeys;
     if (this.Valor == "Agregar") {
      this.service.EnviarRol(this.viewModel).subscribe((data: MensajeViewModel[]) => {
          if(data["message"] == "Operación completada exitosamente."){
          this.ngOnInit();
           this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Insertado con Exito', life: 3000 });
           this.Collapse= false;
           this.DataTable = true;
           this.submitted = false;
           this.Detalles = false;
           this.Agregar= true;
           this.selectedFiles1 = []; 
           this.selectedKeys = [];
          }else{
           this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se logro insertar', life: 3000 });
          }
          
       })
     } else {
          this.viewModel.Rol_Id = this.ID;
          this.service.ActualizarRol(this.viewModel).subscribe((data: MensajeViewModel[]) => {
          if(data["message"] == "Operación completada exitosamente."){
            this.ngOnInit();
           this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Actualizado con Exito', life: 3000 });
           this.Collapse= false;
           this.DataTable = true;
           this.Detalles = false;
           this.submitted = false;
           this.Agregar= true;
           this.selectedFiles1 = []; 
           this.selectedKeys = [];
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
    this.service.EliminarRol(this.ID).subscribe({
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
          this.rolForm = new FormGroup({
            Rol_Rol: new FormControl("",Validators.required),
          });
            this.ID = data.Rol_Id;
            this.Collapse= true;
            this.DataTable = false;
            this.Agregar = false;
            this.Detalles = false;
            this.Contrasenas = false;
            this.Valor = "Editar";
        }
      });

}
onGlobalFilter(table: Table, event: Event) {
  table.filterGlobal((event.target as HTMLInputElement).value, 'Rol');
}
}