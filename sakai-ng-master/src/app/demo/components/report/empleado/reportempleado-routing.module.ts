import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReporteEmpleadoComponent } from './reportempleado.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: ReporteEmpleadoComponent },
    ])],
    exports: [RouterModule],
})
export class ReporteEmpleadoRoutingModule { }
