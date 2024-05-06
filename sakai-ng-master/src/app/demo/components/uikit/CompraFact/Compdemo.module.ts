import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CompraDemoComponent } from './Compdemo.component';
import { CompRoutingModule } from './Compdemo-routing.module';
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
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
 // Importa el servicio ServiceCiu

@NgModule({
  imports: [
    CommonModule,
    CompRoutingModule,
    ToastModule,
    DialogModule,
    FormsModule,
    TooltipModule,
    InputTextModule,
    ButtonModule,
    OverlayPanelModule,
    TableModule,
    ConfirmDialogModule,
    SidebarModule,
    RippleModule,
    ConfirmPopupModule,
    NgxExtendedPdfViewerModule
  ],
  declarations: [CompraDemoComponent],
})
export class CompDemoModule { }
