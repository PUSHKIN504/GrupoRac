import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ClienteDemoComponent } from './clientedemo.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: ClienteDemoComponent }
	])],
	exports: [RouterModule]
})
export class ClienteRoutingModule { }
