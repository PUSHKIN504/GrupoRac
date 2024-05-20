import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChipModule } from 'primeng/chip';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { TooltipModule } from 'primeng/tooltip';
import { ReporteCompraComponent } from './compra/reportcompra.component';
import { ReporteCompraRoutingModule } from './compra/reportcompra-routing.module';
import { ReporteRoutingModule } from './report-routing.module';

@NgModule({
    imports: [
        CommonModule,
        ReporteRoutingModule
    ],
})
export class ReportModule { }
