import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ReporteClienteRoutingModule } from './reportcliente-routing.module';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { TabMenuModule } from 'primeng/tabmenu';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { ReporteClienteComponent } from './reportcliente.component';

@NgModule({
    imports: [
        CommonModule,
        ReporteClienteRoutingModule,
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
    declarations: [ReporteClienteComponent]
})
export class ReporteClienteModule { }
