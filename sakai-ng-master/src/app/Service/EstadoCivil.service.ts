import { Injectable } from '@angular/core';
import {Estado,Fill} from '../Models/EstadoCivilViewModel';
import { HttpClient } from '@angular/common/http';
import { BASE_URL } from './ulrsettings';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs';




@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http:HttpClient) { }


  url = BASE_URL + 'API/EstadoCivil/List'

  getEstadosCivil(){
    return this.http.get<Estado[]>(this.url)
  }
  EnviarEstadoCivil(formData: any): Observable<any> {
    return this.http.post<any>(BASE_URL + 'API/EstadoCivil/Create/', formData).pipe(
      map(response => {
        return response;
      }),
    );
  }
  getFill(codigo: string): Observable<Fill> {
    return this.http.get<Fill>(`${BASE_URL + 'API/EstadoCivil/Fill/' + codigo}`);
  }
  EliminarEstadoCivil(ID): Observable<any>{
    return this.http.delete<any>(`${BASE_URL + 'API/EstadoCivil/Delete/' + ID}`)
  }
  ActualizarEstadoCivil(formData){
    return this.http.put(BASE_URL + 'API/EstadoCivil/Edit/', formData)
  }
}