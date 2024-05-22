import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FacturaVentaComponent } from './facturaventa.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: FacturaVentaComponent }
	])],
	exports: [RouterModule]
})
export class FacturaVentaRoutingModule { }
