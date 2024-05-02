import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ModeloDemoComponent } from './Modelodemo.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: ModeloDemoComponent }
	])],
	exports: [RouterModule]
})
export class ModeloRoutingModule { }
