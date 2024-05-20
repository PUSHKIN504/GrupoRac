import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ReporteEmpleadoRoutingModule } from './reportempleado-routing.module';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { TabMenuModule } from 'primeng/tabmenu';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { ReporteEmpleadoComponent } from './reportempleado.component';

@NgModule({
    imports: [
        CommonModule,
        ReporteEmpleadoRoutingModule,
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
    declarations: [ReporteEmpleadoComponent]
})
export class ReporteEmpleadoModule { }
