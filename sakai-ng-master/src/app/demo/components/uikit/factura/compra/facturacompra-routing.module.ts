import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FacturaCompraComponent } from './facturacompra.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: FacturaCompraComponent }
	])],
	exports: [RouterModule]
})
export class FacturaCompraRoutingModule { }
