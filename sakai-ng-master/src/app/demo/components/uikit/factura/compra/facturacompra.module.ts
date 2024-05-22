import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FacturaCompraComponent } from './facturacompra.component';
import { FacturaCompraRoutingModule } from './facturacompra-routing.module';
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
//import { ServiceCiu } from 'src/app/Service/service.service';
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
import { ToolbarModule } from 'primeng/toolbar';
 
@NgModule({
  imports: [
		ReactiveFormsModule,
    CommonModule,
    FacturaCompraRoutingModule,
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
    ToolbarModule,
    // NgxExtendedPdfViewerModule
  ],
  providers: [DatePipe],
  declarations: [FacturaCompraComponent],
})
export class FacturaCompraModule { }
