import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ListMarcaComponent } from './list-marca.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: ListMarcaComponent }
	])],
	exports: [RouterModule]
})
export class ListMarcaRoutingModule { }