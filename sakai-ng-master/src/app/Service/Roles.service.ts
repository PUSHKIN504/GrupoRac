import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { BASE_URL } from './ulrsettings';
import { Rol,Fill } from '../Models/RolViewModel';
import { Observable } from 'rxjs/internal/Observable';
//import { Pantalla } from '../Models/PantallaViewModel';
import { map } from 'rxjs';

interface ApiResponse {
  code: number;
  success: boolean;
  message: string;
  data: Pantalla[];
}

interface Pantalla {
  ptl_Id: number;
  ptl_Descripcion: string;
  // Incluye otras propiedades según necesites
}




@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http:HttpClient) { }


  url = BASE_URL + 'API/Rol/List'

  getRol(){
    return this.http.get<Rol[]>(this.url)
  }


  EnviarRol(formData: any): Observable<any> {
    return this.http.post<any>(BASE_URL + 'API/Rol/Create/', formData).pipe(
      map(response => {
        return response;
      }),
    );
  }

  getPantallasDeRol(idRoll: number): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${BASE_URL + 'API/PantallaporRol/PantdelRol/' + idRoll}`);
}


  getFill(codigo: string): Observable<Fill> {
    return this.http.get<Fill>(`${BASE_URL + 'API/Rol/Fill/' + codigo}`);
  }
  getDetalles(codigo: string): Observable<Fill> {
    return this.http.get<Fill>(`${BASE_URL + 'API/Rol/FillDetalles/' + codigo}`);
  }
  EliminarRol(ID): Observable<any>{
    return this.http.delete<any>(`${BASE_URL + 'API/Rol/Delete/' + ID}`)
  }
  ActualizarRol(formData){
    return this.http.put(BASE_URL + 'API/Rol/Edit/', formData)
  }
}