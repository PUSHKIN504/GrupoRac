import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ListCargoComponent } from './list-cargo.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: ListCargoComponent }
	])],
	exports: [RouterModule]
})
export class ListCargoRoutingModule { }