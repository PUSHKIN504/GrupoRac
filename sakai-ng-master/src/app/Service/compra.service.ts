import { Injectable } from '@angular/core';
import { CompraEndPoint } from './api.service';
import { HttpClient } from '@angular/common/http';
import { Compra } from '../Models/CompViewModel';

@Injectable({
  providedIn: 'root'
})
export class CompraService {

  constructor(private http:HttpClient) { }

  public endpoint = new CompraEndPoint();

  List(){
    return this.http.get<any>(this.endpoint.List()) 
      .toPromise() 
      .then(res => res.data as Compra[])
      .then(data => data);
  }

  Find(id: number){
    return this.http.get<any>(this.endpoint.Find(id)) 
      .toPromise()  
      .then(res => res.data as Compra[])
      .then(data => data);
  }

  Insert(model: Compra){
    return this.http.post<any>(this.endpoint.Insert(), model) 
      .toPromise()  
  }

  Update(model: Compra){
    return this.http.put<any>(this.endpoint.Update(), model) 
      .toPromise()  
  }

  Delete(id: number){
    return this.http.delete<any>(this.endpoint.Delete(id)) 
      .toPromise()  
  }
  Emitir(model: Compra){
    return this.http.put<any>(this.endpoint.Emitir(), model) 
      .toPromise()  
  }

}