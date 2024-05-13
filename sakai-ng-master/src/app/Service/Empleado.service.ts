import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { BASE_URL } from './ulrsettings';

import { Empleado,Fill } from '../Models/EmpleadoViewModel';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs';
import { dropDepartamento } from '../Models/DepartamentoViewModel';
import { dropMunicipio } from '../Models/CiudadViewModel';
import { dropEstadoCivil } from '../Models/EstadoCivilViewModel';
import { dropCargo } from '../Models/CargoViewModel';




@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  constructor(private http:HttpClient) { }
  url = BASE_URL + 'API/Empleado/List'


  urlDrop = BASE_URL + 'API/Departamento/DropDown'

  getDropDownsDepartamentos(){
    return this.http.get<dropDepartamento[]>(this.urlDrop)
  }

  getMunicipios(codigo){
    return this.http.get<dropMunicipio[]>(BASE_URL + 'API/Municipio/Lista/' + codigo )
  }



  urlDropC = BASE_URL + 'API/Cargo/DropDown'

  getDropDownCargo(){
    return this.http.get<dropDepartamento[]>(this.urlDropC)
  }
  urlDropE = BASE_URL + 'API/EstadoCivil/DropDown'

  getDropDownsEstado(){
    return this.http.get<dropDepartamento[]>(this.urlDropE)
  }

  getEmpleados(){
    return this.http.get<Empleado[]>(this.url)
  }

  EnviarEmpleado(formData: any): Observable<any> {
    return this.http.post<any>(BASE_URL + 'API/Empleado/Create/', formData).pipe(
      map(response => {
        return response;
      }),
    );
  }

    
  getFill(codigo: string): Observable<Fill> {
    return this.http.get<Fill>(`${BASE_URL + 'API/Empleado/Fill/' + codigo}`);
  }
  EliminarEmpleado(ID): Observable<any>{
    return this.http.delete<any>(`${BASE_URL + 'API/Empleado/Delete/' + ID}`)
  }
  ActualizarEmpleado(formData){
    return this.http.put(BASE_URL + 'API/Empleado/Edit/', formData)
  }

}