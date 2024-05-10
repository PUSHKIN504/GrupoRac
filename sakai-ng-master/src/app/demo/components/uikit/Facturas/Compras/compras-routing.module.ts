import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CompraDemoComponent } from './compras.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: CompraDemoComponent }
	])],
	exports: [RouterModule]
})
export class CompRoutingModule { }
