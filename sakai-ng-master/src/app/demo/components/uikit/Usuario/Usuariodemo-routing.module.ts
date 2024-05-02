import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UsuarioDemoComponent } from './Usuariodemo.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: UsuarioDemoComponent }
	])],
	exports: [RouterModule]
})
export class UsuarioRoutingModule { }
