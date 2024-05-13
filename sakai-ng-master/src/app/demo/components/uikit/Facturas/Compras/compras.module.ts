import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CompraDemoComponent } from './compras.component';
import { CompRoutingModule } from './compras-routing.module';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { TableModule } from 'primeng/table';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { SidebarModule } from 'primeng/sidebar';
import { RippleModule } from 'primeng/ripple';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { TooltipModule } from 'primeng/tooltip';
import { InputTextModule } from 'primeng/inputtext';
import { ServiceCiu } from 'src/app/Service/service.service';
// import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
 // Importa el servicio ServiceCiu
 import { MatExpansionModule } from '@angular/material/expansion';
 import { MatFormFieldModule } from '@angular/material/form-field';
 import { MatInputModule } from '@angular/material/input';
 import { MatButtonModule } from '@angular/material/button';
 import { ReactiveFormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
 
@NgModule({
  imports: [
		ReactiveFormsModule,

    CommonModule,
    CompRoutingModule,
    ToastModule,
    DialogModule,
    DropdownModule,
    FormsModule,
    TooltipModule,
    InputTextModule,
    ButtonModule,
    OverlayPanelModule,
    TableModule,
    InputNumberModule,
    ConfirmDialogModule,
    SidebarModule,
    RippleModule,
    ConfirmPopupModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    CalendarModule,
    MatButtonModule,
    AutoCompleteModule,
    // NgxExtendedPdfViewerModule
  ],
  declarations: [CompraDemoComponent],
})
export class CompDemoModule { }
