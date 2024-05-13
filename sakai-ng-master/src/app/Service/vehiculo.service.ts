import { Injectable } from '@angular/core';
import { VehiculoEndPoint } from './api.service';
import { HttpClient } from '@angular/common/http';
import { Vehiculo } from '../Models/VehiculoViewModel';

@Injectable({
  providedIn: 'root'
})
export class VehiculoService {

  constructor(private http:HttpClient) { }

  public endpoint = new VehiculoEndPoint();

  List(){
    return this.http.get<any>(this.endpoint.List()) 
      .toPromise() 
      .then(res => res.data as Vehiculo[])
      .then(data => data);
  }

  FindDetalle(id: number){
    return this.http.get<any>(this.endpoint.Find(id)) 
      .toPromise()  
      .then(res => res.data as Vehiculo[])
      .then(data => data);
  }

  Insert(model: Vehiculo){
    return this.http.post<any>(this.endpoint.Insert(), model) 
      .toPromise()  
  }

  Update(model: Vehiculo){
    return this.http.put<any>(this.endpoint.Update(), model) 
      .toPromise()  
  }

  Delete(id: string){
    return this.http.delete<any>(this.endpoint.Delete(id)) 
      .toPromise()  
  }
  Desactivar(model: Vehiculo){
    return this.http.put<any>(this.endpoint.Desactivar(), model) 
      .toPromise()  
  }

}