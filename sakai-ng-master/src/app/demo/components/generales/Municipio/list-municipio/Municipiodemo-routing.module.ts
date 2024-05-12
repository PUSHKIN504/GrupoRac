import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MunicipioDemoComponent } from './Municipiodemo.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: MunicipioDemoComponent }
	])],
	exports: [RouterModule]
})
export class MunicipioRoutingModule { }