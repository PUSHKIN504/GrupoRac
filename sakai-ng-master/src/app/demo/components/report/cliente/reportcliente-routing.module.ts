import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReporteClienteComponent } from './reportcliente.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: ReporteClienteComponent },
    ])],
    exports: [RouterModule],
})
export class ReporteClienteRoutingModule { }
