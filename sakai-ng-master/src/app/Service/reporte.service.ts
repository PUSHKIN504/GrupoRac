import { Injectable } from '@angular/core';
import { ReporteEndPoint } from './api.service';
import { HttpClient } from '@angular/common/http';
import { Compra } from '../Models/CompViewModel';
import { Cliente } from '../Models/ClienteViewModel';
import { Empleado } from '../Models/EmpleadoViewModel';
import { Vehiculo } from '../Models/VehiculoViewModel';
import { Venta } from '../Models/VentaViewModel';
import autoTable from 'jspdf-autotable';
import jsPDF from 'jspdf';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class ReporteService {

  constructor(private http:HttpClient, private cookieService : CookieService) { }

  public endpoint = new ReporteEndPoint();

  reporteCompras(month?: string, year?: string){
    return this.http.get<any>(this.endpoint.reporteCompras(month,year)) 
      .toPromise() 
      .then(res => res.data as Compra[])
      .then(data => data);
  }

  reporteVentas(month?: string, year?: string, sede?: number){
    return this.http.get<any>(this.endpoint.reporteVentas(month,year,sede)) 
      .toPromise() 
      .then(res => res.data as Venta[])
      .then(data => data);
  }

  reporteClientes(ciudad?: string){
    return this.http.get<any>(this.endpoint.reporteClientes(ciudad)) 
      .toPromise() 
      .then(res => res.data as Cliente[])
      .then(data => data);
  }

  reporteEmpleados(){
    return this.http.get<any>(this.endpoint.reporteEmpleados()) 
      .toPromise() 
      .then(res => res.data as Empleado[])
      .then(data => data);
  }

  reporteVehiculos(){
    return this.http.get<any>(this.endpoint.reporteVehiculos()) 
      .toPromise() 
      .then(res => res.data as Vehiculo[])
      .then(data => data);
  }

}