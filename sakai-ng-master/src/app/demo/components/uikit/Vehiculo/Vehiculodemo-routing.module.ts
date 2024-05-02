import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { VehiculoDemoComponent } from './Vehiculodemo.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: VehiculoDemoComponent }
	])],
	exports: [RouterModule]
})
export class VehiculoRoutingModule { }
