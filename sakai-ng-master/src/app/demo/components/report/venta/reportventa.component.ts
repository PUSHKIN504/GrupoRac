import { Component, OnInit, Renderer2  } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem, SelectItem } from 'primeng/api';
import { delay, identity } from 'rxjs';
import { ServiceSede, ServiceUsuario } from 'src/app/Service/service.service';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { CookieService } from 'ngx-cookie-service';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable'
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ReporteService } from 'src/app/Service/reporte.service';
import { DatePipe } from '@angular/common';
import { Venta } from 'src/app/Models/VentaViewModel';
import { Sede } from 'src/app/Models/SedeViewModel';
import { ServiceService } from 'src/app/Service/Sede.service';

@Component({
    selector: 'app-login',
    templateUrl: './reportventa.component.html',
})
export class ReporteVentaComponent implements OnInit{
  
    year: SelectItem[] = [];
    month: SelectItem[] = [];
    sedesDDL: SelectItem[] = [];
    selectedYear?: string = '2024';
    selectedMonth?: string = '5';
    selectedSede?: number = 1;

    sedes: Sede[] = [];
    ventas: Venta[] = [];

    pdfSrc: SafeResourceUrl | null = null;

    hoy = new Date();

  
    constructor(private router: Router, private reporteService: ReporteService, private sedeService: ServiceService,private renderer: Renderer2, 
                private cookie : CookieService, private sanitizer: DomSanitizer, private datePipe: DatePipe) {}

   async ngOnInit() {
      this.year = [
          { label: '2024', value: '2024' },
          { label: '2023', value: '2023' },
          { label: '2022', value: '2022' },
          { label: '2021', value: '2021' },
          { label: '2020', value: '2020' }
      ];
  
      this.month = [
        { label: 'Enero', value: '1' },
        { label: 'Febrero',  value: '2' },
        { label: 'Marzo',  value:'3'},
        { label: 'Abril',  value:  '4' },
        { label: 'Mayo',  value: '5' },
        { label: 'Junio', value: '6'},
        { label: 'Julio',  value: '7' },
        { label: 'Agosto',  value: '8' },
        { label: 'Septiembre',  value: '9' },
        { label: 'Octubre', value: '10' },
        { label: 'Noviembre', value:  '11'},
        { label: 'Diciembre',  value: '12'},
      ];

      await this.sedeService.getSucursal().subscribe((data: any)=>{
        this.sedes = data;

        this.sedes.forEach(element => {
          this.sedesDDL.push({label: element.sed_Descripcion, value: element.sed_Id.toString()})
        });
        console.log(this.sedesDDL)
      });


      await this.reporteService.reporteVentas(this.selectedMonth,this.selectedYear, this.selectedSede)
        .then(data => {
          this.ventas = data;
          console.log(data, "data")


          const cuerpo = this.ventas.map(item => [
            item.veE_Id.toString(),
            item.cli_Id.toString(),
            item.cli_NombreCompleto.toString(),
            item.VeE_Precio.toString(),
          ]);

          const cuerpoSinPrimerElemento = cuerpo.slice(1);

          const total = data.reduce((sum, item) => {
            const itemTotal = parseFloat(item.VeE_Precio.toString()) || 0; 
            return sum + itemTotal;
              }, 0);
          
          const totales = total.toFixed(2);

          const img = "assets/layout/images/themes/logo.jpg";

          const doc = new jsPDF({
            orientation: 'portrait',
            unit: 'px',
            format: 'letter'
          });

        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();
        const margin = 10; 
        const contentWidth = pageWidth - 2 * margin;
        const contentHeight = pageHeight - 2 * margin;

        const primaryColor = [146, 8, 8]; 
        const blackColor = [0, 0, 0]; 
        const whiteColor = [255, 255, 255]; 

        doc.setDrawColor(primaryColor[0], primaryColor[1], primaryColor[2]);

        doc.line(margin, margin, pageWidth - margin, margin);

        doc.line(pageWidth - margin, margin, pageWidth - margin, pageHeight - margin);

        doc.line(pageWidth - margin, pageHeight - margin, margin, pageHeight - margin);

        doc.line(margin, pageHeight - margin, margin, margin);

        
        
        let pageNumber = 1;

        const availableWidth = contentWidth - 30;

        const imgWidth = pageWidth;
        const imgHeight = 50;
        doc.addImage(img, 'JPEG', margin - 5, margin - 5, 35, 35); 

        doc.setFontSize(10);
        doc.setFont(undefined, 'bold');
        doc.text('Grupo Rac, Sur', imgWidth - margin - 10, margin + 20, { align: 'right' });

        doc.setFontSize(10);
        doc.setFont(undefined, 'normal');
        doc.text('Dirección: Avenida Valle de Angeles, Calle 5, \nCholuteca, Francisco Morazán', imgWidth - margin - 10, margin + 30, { align: 'right' });

        doc.setFontSize(10);
        doc.setFont(undefined, 'bold');
        doc.text('Mes: ' + this.selectedMonth, margin + 10, margin + imgHeight + 40);
        doc.setFontSize(10);
        doc.setFont(undefined, 'bold');
        doc.text('Año: ' + this.selectedYear, margin + 10, margin + imgHeight + 50); 

        doc.setFontSize(10);
        doc.setFont(undefined, 'bold');
        doc.text('Total: ' + total, margin + availableWidth, margin + imgHeight + 40, { align: 'right' });

        const footer = () => {
            doc.setFontSize(10);
            doc.setFont(undefined, 'normal');
            doc.text(String(pageNumber), pageWidth - margin - 10, pageHeight - margin - 10, { align: 'right' });
            const usuario = this.cookie.get('Empleado');
            const fechaC = this.datePipe.transform(this.hoy, 'yyyy-MM-dd')
            doc.text('Usuario:' + usuario,margin + 10, pageHeight - margin - 10 - 10);
            doc.text('Fecha:' + fechaC,margin + 10, pageHeight - margin - 10);
        };
        
        doc.setFontSize(15);
        doc.setFont(undefined, 'bold');
        doc.text('Reporte de Ventas', margin + 10, margin + imgHeight + 70);

        autoTable(doc, {
            head: [['Factura', 'Id Cliente', 'Cliente', 'Precio']],
            body: cuerpo,
            startY: margin + imgHeight + 75, 
            margin: { top: margin + 10, bottom: margin + 10, left: margin + 10, right: margin + 10},
            styles: {
                fontSize: 10,
            },
            headStyles: {
                fillColor: [146, 8, 8],
                textColor: [255, 255, 255],
                halign: 'center',
                valign: 'middle',
                fontStyle: 'bold',
            },
            columnStyles: {
                0: { halign: 'center' },
                1: { halign: 'center' },
                2: { halign: 'center' },
                3: { halign: 'center' },
                4: { halign: 'center' }
            },
            theme: 'grid',
            didDrawPage: (data) => {
                footer();
                pageNumber++;
            }
        });
          
          const blob = doc.output('blob');
          const url = URL.createObjectURL(blob);
          this.pdfSrc = this.sanitizer.bypassSecurityTrustResourceUrl(url);
        })
      
    }

    cargarPdf(): void{
      this.ngOnInit();
    }

  }
  