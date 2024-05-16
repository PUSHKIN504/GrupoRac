import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BASE_URL } from './ulrsettings';
import { Cargo, Fill } from '../Models/CargoViewModel';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs';




@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http:HttpClient) { }


  url = BASE_URL + 'API/Cargo/List'

  getCargo(){
    return this.http.get<Cargo[]>(this.url)
  }


  EnviarCargo(formData: any): Observable<any> {
    return this.http.post<any>(BASE_URL + 'API/Cargo/Create/', formData).pipe(
      map(response => {
        return response;
      }),
    );
  }

  getFill(id: string): Observable<Fill> {
    return this.http.get<Fill>(`${BASE_URL + 'API/Cargo/Fill/' + id}`);
  }
  EliminarCargo(ID): Observable<any>{
    return this.http.delete<any>(`${BASE_URL + 'API/Cargo/Delete/' + ID}`)
  }
  ActualizarCargo(formData){
    return this.http.put(BASE_URL + 'API/Cargo/Edit/', formData)
  }

}