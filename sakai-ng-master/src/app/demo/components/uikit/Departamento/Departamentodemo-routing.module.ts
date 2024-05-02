import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DepartamentoDemoComponent } from './Departamentodemo.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: DepartamentoDemoComponent }
	])],
	exports: [RouterModule]
})
export class DepartamentoRoutingModule { }
