import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreeModule } from 'primeng/tree';
import { TreeTableModule } from 'primeng/treetable';
import { RolRoutingModule } from './rol-routing.module';
import { RolComponent } from './rol.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  
  imports: [
    CommonModule,
    RolRoutingModule,
    FormsModule,
		TreeModule,
		TreeTableModule
  ],
  declarations: [RolComponent]
})
export class RolModule { }
