import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ListClienteComponent } from './list-cliente.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: ListClienteComponent }
	])],
	exports: [RouterModule]
})
export class ListClienteRoutingModule { }