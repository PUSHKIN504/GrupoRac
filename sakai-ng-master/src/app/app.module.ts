import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './layout/app.layout.module';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { ProductService } from './demo/service/product.service';
import { CountryService } from './demo/service/country.service';
import { CustomerService } from './demo/service/customer.service';
import { EventService } from './demo/service/event.service';
import { IconService } from './demo/service/icon.service';
import { NodeService } from './demo/service/node.service';
import { PhotoService } from './demo/service/photo.service';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

import { FormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { LoginComponent } from './login/login/login.component';


// Importa otros componentes y servicios si es necesario

@NgModule({
    declarations: [AppComponent, NotfoundComponent, LoginComponent],
    imports: [
        AppRoutingModule, 
        AppLayoutModule,
        ButtonModule,
        InputTextModule,
        FormsModule,
        MatExpansionModule,
        BrowserModule,
        BrowserAnimationsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        FormsModule
    ],
       

    providers: [
        { provide: LocationStrategy, useClass: PathLocationStrategy },
        CountryService, CustomerService, EventService, IconService, NodeService,
        PhotoService, ProductService
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
