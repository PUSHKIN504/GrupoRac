import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Product } from 'src/app/demo/api/product';
import { Router } from '@angular/router';
import { Table } from 'primeng/table';
import { Ciudad } from 'src/app/Models/CiudadViewModel';
import { ServiceCiu } from 'src/app/Service/service.service';

@Component({
    templateUrl: './Ciudaddemo.component.html',
    providers: [ConfirmationService, MessageService]
})
export class CiudadDemoComponent implements OnInit {
    ciudad: Ciudad[] = [];
    statuses: any[] = [];
    products: Product[] = [];
    rowGroupMetadata: any;
    activityValues: number[] = [0, 100];
    isExpanded: boolean = false;
    idFrozen: boolean = false;
    loading: boolean = false;
    @ViewChild('filter') filter!: ElementRef;
    @ViewChild('dt') dataTable!: Table; // Add this line to get a reference to the PrimeNG table

    constructor(private service: ServiceCiu, private router: Router) { }

    ngOnInit(): void {
        this.service.getCiudad().subscribe((data: any) => {
            console.log(data);
            this.ciudad = data;
            // Initialize data table after data is fetched
            if (this.dataTable) {
                this.dataTable.reset(); // Reset table state
                this.dataTable.value = this.ciudad; // Set data to the table
            }
        }, error => {
            console.log(error);
        });
    }

    formatCurrency(value: number) {
        return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

}
