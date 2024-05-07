import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ComFDemoComponent } from './ComFdemo.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: ComFDemoComponent }
	])],
	exports: [RouterModule]
})
export class CompRoutingModule { }
