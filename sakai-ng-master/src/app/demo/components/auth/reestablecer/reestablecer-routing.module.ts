import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReestablecerComponent } from './reestablecer.component';
import { LoginComponent } from '../login/login.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: ReestablecerComponent },
        {path: 'login', component: LoginComponent}

    ])],
    exports: [RouterModule]
})
export class ReestablecerRoutingModule { }
