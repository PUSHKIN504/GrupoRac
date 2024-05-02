import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MarcaDemoComponent } from './Marcademo.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: MarcaDemoComponent }
	])],
	exports: [RouterModule]
})
export class MarcaRoutingModule { }
