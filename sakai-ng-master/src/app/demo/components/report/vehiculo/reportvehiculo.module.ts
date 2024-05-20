import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ReporteVehiculoRoutingModule } from './reportvehiculo-routing.module';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { TabMenuModule } from 'primeng/tabmenu';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { ReporteVehiculoComponent } from './reportvehiculo.component';

@NgModule({
    imports: [
        CommonModule,
        ReporteVehiculoRoutingModule,
        ButtonModule,
        CheckboxModule,
        InputTextModule,
        FormsModule,
        PasswordModule,
        TabMenuModule,
        DialogModule,
        DropdownModule
    ],
    providers: [DatePipe],
    declarations: [ReporteVehiculoComponent]
})
export class ReporteVehiculoModule { }
