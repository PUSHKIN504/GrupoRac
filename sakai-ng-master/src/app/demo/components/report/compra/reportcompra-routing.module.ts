import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReporteCompraComponent } from './reportcompra.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: ReporteCompraComponent },
    ])],
    exports: [RouterModule]
})
export class ReporteCompraRoutingModule { }
