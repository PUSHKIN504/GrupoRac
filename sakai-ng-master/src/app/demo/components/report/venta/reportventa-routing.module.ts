import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReporteVentaComponent } from './reportventa.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: ReporteVentaComponent },
    ])],
    exports: [RouterModule]
})
export class ReporteVentaRoutingModule { }
