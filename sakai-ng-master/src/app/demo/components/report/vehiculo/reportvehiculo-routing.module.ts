import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReporteVehiculoComponent } from './reportvehiculo.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: ReporteVehiculoComponent },
    ])],
    exports: [RouterModule]
})
export class ReporteVehiculoRoutingModule { }
