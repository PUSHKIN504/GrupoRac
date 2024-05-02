import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CiudadDemoComponent } from './Ciudaddemo.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: CiudadDemoComponent }
	])],
	exports: [RouterModule]
})
export class CiudadRoutingModule { }
