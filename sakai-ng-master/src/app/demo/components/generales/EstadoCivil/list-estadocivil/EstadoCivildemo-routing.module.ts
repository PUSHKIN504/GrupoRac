import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EstadoCivilDemoComponent } from './EstadoCivildemo.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: EstadoCivilDemoComponent }
	])],
	exports: [RouterModule]
})
export class EstadoCivilRoutingModule { }