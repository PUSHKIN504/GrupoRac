import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ListSedeComponent } from './list-sede.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: ListSedeComponent }
	])],
	exports: [RouterModule]
})
export class ListSedeRoutingModule { }