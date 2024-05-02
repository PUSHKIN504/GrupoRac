import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SedeDemoComponent } from './Sededemo.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: SedeDemoComponent }
	])],
	exports: [RouterModule]
})
export class SedeRoutingModule { }
