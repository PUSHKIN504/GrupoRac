import { NgModule } from '@angular/core';
import { UsuarioDemoComponent } from './Usuariodemo.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [];

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: UsuarioDemoComponent }
	])],
	exports: [RouterModule]
})
export class UsuarioRoutingModule { }
