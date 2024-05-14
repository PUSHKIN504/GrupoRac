import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ListRolComponent } from './list-rol.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: ListRolComponent }
	])],
	exports: [RouterModule]
})
export class ListRolRoutingModule { }