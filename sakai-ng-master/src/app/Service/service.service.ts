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


  urlC = 'https://localhost:44320/API/Departamento/ListMarca'

  getMarca(){
    return this.http.get<Marca[]>(this.urlC)
  }
}
@Injectable({
  providedIn: 'root'
})

export class ServiceModelo {

  constructor(private http:HttpClient) { }


  urlC = 'https://localhost:44320/API/Departamento/ListModelo'

  getModelo(){
    return this.http.get<Modelo[]>(this.urlC)
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

