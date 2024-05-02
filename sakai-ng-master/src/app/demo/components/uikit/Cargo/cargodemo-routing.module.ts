import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CargoDemoComponent } from './cargodemo.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: CargoDemoComponent }
	])],
	exports: [RouterModule]
})
export class CargoRoutingModule { }
