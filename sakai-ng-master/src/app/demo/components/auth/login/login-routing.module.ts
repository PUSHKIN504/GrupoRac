import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login.component';
import { ReestablecerComponent } from '../reestablecer/reestablecer.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: LoginComponent },
        {path: 'reestablecer', component: ReestablecerComponent},

    ])],
    exports: [RouterModule]
})
export class LoginRoutingModule { }
