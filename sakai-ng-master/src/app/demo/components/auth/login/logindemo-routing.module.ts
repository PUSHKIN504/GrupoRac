import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginDemoComponent } from './logindemo.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: LoginDemoComponent }
    ])],
    exports: [RouterModule]
})
export class LoginRoutingModule { }
