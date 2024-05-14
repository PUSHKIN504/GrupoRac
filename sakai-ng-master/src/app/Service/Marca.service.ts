import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { BASE_URL } from './ulrsettings';

import { Marca,Fill } from '../Models/MarcaViewModel';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs';




@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http:HttpClient) { }


  url = BASE_URL + 'API/Marca/List'

  getMarca(){
    return this.http.get<Marca[]>(this.url)
  }
  getMarcaPorUsuarioYSede(usuario: string): Observable<Marca[]> {
    return this.http.get<Marca[]>(`${BASE_URL}API/Marca/MarcasPorUsuario/${encodeURIComponent(usuario)}`);
  }
  
  
  

  
  EnviarMarca(formData: any): Observable<any> {
    return this.http.post<any>(BASE_URL + 'API/Marca/Create/', formData).pipe(
      map(response => {
        return response;
      }),
    );
  }

  getFill(codigo: string): Observable<Fill> {
    return this.http.get<Fill>(`${BASE_URL + 'API/Marca/Fill/' + codigo}`);
  }
  EliminarMarca(ID): Observable<any>{
    return this.http.delete<any>(`${BASE_URL + 'API/Marca/Delete/' + ID}`)
  }
  ActualizarMarca(formData){
    return this.http.put(BASE_URL + 'API/Marca/Edit/', formData)
  }


}