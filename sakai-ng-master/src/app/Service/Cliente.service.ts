import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { BASE_URL } from './ulrsettings';
import { Cliente,Fill } from '../Models/ClienteViewModel';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs';
import { dropDepartamento } from '../Models/DepartamentoViewModel';
import { dropMunicipio } from '../Models/CiudadViewModel';
//import { dropEstadoCivil } from '../Models/EstadoCivilViewModel';
import { dropCargo } from '../Models/CargoViewModel';




@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  constructor(private http:HttpClient) { }


  urlDrop = BASE_URL + 'API/Departamento/DropDown'

  getDropDownsDepartamentos(){
    return this.http.get<dropDepartamento[]>(this.urlDrop)
  }




  urlDropC = BASE_URL + 'API/Cargo/DropDown'

  getDropDownCargo(){
    return this.http.get<dropDepartamento[]>(this.urlDropC)
  }
  urlDropE = BASE_URL + 'API/EstadoCivil/DropDown'

  getDropDownsEstado(){
    return this.http.get<dropDepartamento[]>(this.urlDropE)
  }



  getMunicipios(codigo){
    return this.http.get<dropMunicipio[]>(BASE_URL + 'API/Municipio/Lista/' + codigo )
  }


  url = BASE_URL + 'API/Cliente/List'

  getClientes(){
    return this.http.get<Cliente[]>(this.url)
  }


  
  EnviarCliente(formData: any): Observable<any> {
    return this.http.post<any>(BASE_URL + 'API/Cliente/Create/', formData).pipe(
      map(response => {
        return response;
      }),
    );
  }

  getFill(codigo: string): Observable<Fill> {
    return this.http.get<Fill>(`${BASE_URL + 'API/Cliente/Fill/' + codigo}`);
  }
  EliminarCliente(ID): Observable<any>{
    return this.http.delete<any>(`${BASE_URL + 'API/Cliente/Delete/' + ID}`)
  }
  ActualizarCliente(formData){
    return this.http.put(BASE_URL + 'API/Cliente/Edit/', formData)
  }

}