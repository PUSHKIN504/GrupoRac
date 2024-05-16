import { Injectable } from '@angular/core';
//import { Departamento } from '../models/DepartamentoViewModel';
import { HttpClient } from '@angular/common/http';
import { BASE_URL } from './ulrsettings';


@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http:HttpClient) { }

  Empledept(sucursal: string, inicio: string, fin: string) {
    return this.http.get<any>(`${BASE_URL}API/Departamento/Empledept/${sucursal}/${inicio}/${fin}`);
   } 
  
  Todasdept(inicio: string, fin: string) {
    return this.http.get<any>(`${BASE_URL}API/Departamento/Todas/${inicio}/${fin}`);
  }
  
  Emplecargo(sucursal: string, inicio: string, fin: string) {
    return this.http.get<any>(`${BASE_URL}API/Cargo/Emplecargo/${sucursal}/${inicio}/${fin}`);
   } 
  
  Todascrg(inicio: string, fin: string) {
    return this.http.get<any>(`${BASE_URL}API/Cargo/Todas/${inicio}/${fin}`);
  }
  Tocalcompras(sucursal: string, inicio: string, fin: string) {
    return this.http.get<any>(`${BASE_URL}API/Cliente/Tocalcompras/${sucursal}/${inicio}/${fin}`);
   } 
  
  Todascli(inicio: string, fin: string) {
    return this.http.get<any>(`${BASE_URL}API/Cliente/Todas/${inicio}/${fin}`);
  }
  Popularidad(sucursal: string, inicio: string, fin: string) {
    return this.http.get<any>(`${BASE_URL}API/Modelo/Popularidad/${sucursal}/${inicio}/${fin}`);
   } 
  
  Todasmode(inicio: string, fin: string) {
    return this.http.get<any>(`${BASE_URL}API/Modelo/Todas/${inicio}/${fin}`);
  }
  
}