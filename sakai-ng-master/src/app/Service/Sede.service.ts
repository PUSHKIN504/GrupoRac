import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BASE_URL } from './ulrsettings';
import { Sede,Fill } from '../Models/SedeViewModel';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs';
import { dropDepartamento } from '../Models/DepartamentoViewModel';
import { dropMunicipio } from '../Models/CiudadViewModel';




@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http:HttpClient) { }


  url = BASE_URL + 'API/Sede/List'
  
  urlDrop = BASE_URL + 'API/Departamento/DropDown'

  getDropDownsDepartamentos(){
    return this.http.get<dropDepartamento[]>(this.urlDrop)
  }

  getMunicipios(codigo){
    return this.http.get<dropMunicipio[]>(BASE_URL + 'API/Municipio/Lista/' + codigo )
  }

  getSucursal(){
    return this.http.get<Sede[]>(this.url)
  }

  getFill(codigo: string): Observable<Fill> {
    return this.http.get<Fill>(`${BASE_URL + 'API/Sede/Fill/' + codigo}`);
  }

  
  EnviarSucursal(formData: any): Observable<any> {
    return this.http.post<any>(BASE_URL + 'API/Sede/Create/', formData).pipe(
      map(response => {
        return response;
      }),
    );
  }

  EliminarSucursal(ID): Observable<any>{
    return this.http.delete<any>(`${BASE_URL + 'API/Sede/Delete/' + ID}`)
  }

  ActualizarSucursal(formData){
    return this.http.put(BASE_URL + 'API/Sede/Edit/', formData)
  }
}