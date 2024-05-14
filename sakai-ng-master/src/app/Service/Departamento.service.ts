import { Injectable } from '@angular/core';
import {Departamento,Fill} from '../Models/DepartamentoViewModel';
import {dropDepartamento} from '../Models/DepartamentoViewModel';
import { HttpClient } from '@angular/common/http';
import { BASE_URL } from './ulrsettings';
import { Dropdown } from 'primeng/dropdown';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs';





@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http:HttpClient) { }


  url = BASE_URL + 'API/Departamento/List'

  getDepartamentos(){
    return this.http.get<Departamento[]>(this.url)
  }
  
  DepartamentoEnviar(formData: any): Observable<any> {
    return this.http.post<any>(BASE_URL + 'API/Departamento/Create/', formData).pipe(
      map(response => {
        return response;
      }),
    );
  }

  
  getFill(codigo: string): Observable<Fill> {
    return this.http.get<Fill>(`${BASE_URL + 'API/Departamento/Fill/' + codigo}`);
  }
  EliminarDepartamento(ID): Observable<any>{
    return this.http.delete<any>(`${BASE_URL + 'API/Departamento/Delete/' + ID}`)
  }
  ActualizarDepartamento(formData){
    return this.http.put(BASE_URL + 'API/Departamento/Edit/', formData)
  }
  
}