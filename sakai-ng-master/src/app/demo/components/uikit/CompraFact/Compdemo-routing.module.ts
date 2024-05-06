import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CompraDemoComponent } from './Compdemo.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: CompraDemoComponent }
	])],
	exports: [RouterModule]
})
export class CompRoutingModule { }
