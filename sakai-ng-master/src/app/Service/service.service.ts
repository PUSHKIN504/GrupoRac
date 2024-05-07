import { Injectable } from '@angular/core';
import {Departamento} from '../Models/DepartamentoViewModel';
import {Ciudad} from '../Models/CiudadViewModel';
import { HttpClient } from '@angular/common/http';
import { Cargo } from '../Models/CargoViewModel';
import { Cliente } from '../Models/ClienteViewModel';
import { EstadoCivil } from '../Models/EstadoCivilViewModel';
import { Marca } from '../Models/MarcaViewModel';
import { Modelo } from '../Models/ModeloViewModel';
import { Sede } from '../Models/SedeViewModel';
import { Vehiculo } from '../Models/VehiculoViewModel';
import { Usuario } from '../Models/UsuarioViewModel';
import { Observable } from 'rxjs';
import { Compra } from '../Models/CompViewModel';





@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  private baseUrl = 'https://localhost:44320/API/Departamento';

  constructor(private http: HttpClient) {}

  // Método para obtener todos los departamentos
  getDepartamentos(): Observable<Departamento[]> {
    return this.http.get<Departamento[]>(`${this.baseUrl}/List`);
  }

  // Método para agregar un nuevo departamento
  addDepartamento(departamento: Departamento): Observable<Departamento> {
    return this.http.post<Departamento>(`${this.baseUrl}/Insert`, departamento);
  }

  getDepartamentoById(id: string): Observable<Departamento> {
    return this.http.get<Departamento>(`${this.baseUrl}/Edit/${id}`);
  }

  updateDepartamento(id: string, departamento: Departamento): Observable<Departamento> {
    return this.http.put<Departamento>(`${this.baseUrl}/Edit/${id}`, departamento);
  }
}




@Injectable({
  providedIn: 'root'
})
export class ServiceCiu {

  constructor(private http:HttpClient) { }


  urlC = 'https://localhost:44320/API/Departamento/ListCiu'

  getCiudad(){
    return this.http.get<Ciudad[]>(this.urlC)
  }
  
  GenerateInvoicePDF(invoiceno:any){
    return this.http.get('https://localhost:44320/API/Departamento/generatepdf?InvoiceNo='+invoiceno,{observe:'response',responseType:'blob'});
    
  }
}
@Injectable({
  providedIn: 'root'
})

export class ServiceCargo {

  constructor(private http:HttpClient) { }


  urlC = 'https://localhost:44320/API/Departamento/ListCargo'

  getCargo(){
    return this.http.get<Cargo[]>(this.urlC)
  }
}
@Injectable({
  providedIn: 'root'
})

export class ServiceCliente {

  constructor(private http:HttpClient) { }


  urlC = 'https://localhost:44320/API/Departamento/ListCli'

  getCliente(){
    return this.http.get<Cliente[]>(this.urlC)
  }
}

@Injectable({
  providedIn: 'root'
})

export class ServiceEstadoCivil {

  constructor(private http:HttpClient) { }


  urlC = 'https://localhost:44320/API/Departamento/ListEstC'

  getEstadoCivil(){
    return this.http.get<EstadoCivil[]>(this.urlC)
  }
}
@Injectable({
  providedIn: 'root'
})

export class ServiceMarca {

  constructor(private http:HttpClient) { }

  private baseUrl = 'https://localhost:44320/API/Departamento';

  urlC = 'https://localhost:44320/API/Departamento/ListMarca'
  private urlcoso= "https://localhost:44320/API/Marca/";
  getMarca(){
    return this.http.get<Marca[]>(this.urlC)
  }
  addMarca(marca: Marca): Observable<Marca> {
    return this.http.post<Marca>(`${this.baseUrl}/InsertMarc`, marca);
  }
  eliminar(idDepartamento:Number):Observable<void>{
    return this.http.delete<void>(`${this.urlcoso}Delete/${idDepartamento}`);
  }
  actualizar(modelo:Marca):Observable<Marca>{
    return this.http.put<Marca>(`${this.urlcoso}EditMar`,modelo);
  }
}
@Injectable({
  providedIn: 'root'
})

export class ServiceModelo {

  constructor(private http:HttpClient) { }

  private urlcoso= "https://localhost:44320/API/Modelo/";

  urlC = 'https://localhost:44320/API/Departamento/ListModelo'

  getModelo(){
    return this.http.get<Modelo[]>(this.urlC)
  }
  addModelo(modelo: Modelo): Observable<Modelo> {
    return this.http.post<Modelo>(`${this.urlcoso}/Create`, modelo);
  }
  eliminar(idDepartamento:Number):Observable<void>{
    return this.http.delete<void>(`${this.urlcoso}Delete/${idDepartamento}`);
  }
  actualizar(modelo:Modelo):Observable<Modelo>{
    return this.http.put<Modelo>(`${this.urlcoso}Edit`,modelo);
  }
}
@Injectable({
  providedIn: 'root'
})

export class ServiceSede {

  constructor(private http:HttpClient) { }


  urlC = 'https://localhost:44320/API/Departamento/ListSede'

  getSede(){
    return this.http.get<Sede[]>(this.urlC)
  }
}
@Injectable({
  providedIn: 'root'
})

export class ServiceVeh {

  constructor(private http:HttpClient) { }


  urlC = 'https://localhost:44320/API/Departamento/ListVehiculo'

  getVeh(){
    return this.http.get<Vehiculo[]>(this.urlC)
  }
}
@Injectable({
  providedIn: 'root'
})
export class ServiceUsuario {
  private baseUrl = 'https://localhost:44320/api/Usuario'; // Ajusta la base URL si es necesario

  constructor(private http: HttpClient) {}

  // Método para obtener usuarios (ya existente)
  getUsuario() {
    return this.http.get<Usuario[]>(`${this.baseUrl}/List`);
  }

  // Método para iniciar sesión (nuevo método)
  login(usuario: string, contraseña: string): Observable<any> {
    const url = `${this.baseUrl}/Login/${encodeURIComponent(usuario)},${encodeURIComponent(contraseña)}`;
    return this.http.get<any>(url);
  }
}


@Injectable({
  providedIn: 'root'
})

export class ServiceComp {

  constructor(private http:HttpClient) { }


  urlC = 'https://localhost:44320/API/Compra/'

  getCompras(){
    return this.http.get<Compra[]>(this.urlC+'List')
  }
  addModelo(comp: Compra): Observable<Compra> {
    return this.http.post<Compra>(`${this.urlC}Create`, comp);
  }
}

