import { HttpClient } from "@angular/common/http";
import { Fill, Usuario } from "../Models/UsuarioViewModel";
import { Injectable } from "@angular/core";
import { BASE_URL } from "./ulrsettings";
import { dropRol } from "../Models/RolViewModel";
import { Observable, map } from "rxjs";

@Injectable({
    providedIn: 'root'
  })
  export class ServiceService {

    constructor(private http: HttpClient) {}

    urlDropRol = BASE_URL + 'API/Rol/DropDown'

    getDropDownRol(){
      return this.http.get<dropRol[]>(this.urlDropRol)
    }

    url = BASE_URL + 'api/Usuario/List';
  
    getUsuario() {
      return this.http.get<Usuario[]>(`${this.url}`);
    }

    EnviarUsuario(formData: any): Observable<any> {
        return this.http.post<any>(BASE_URL + 'Api/Usuario/Insertar/', formData).pipe(
          map(response => {
            return response;
          }),
        );
      }
    
      getFill(codigo: string): Observable<Fill> {
        return this.http.get<Fill>(`${BASE_URL + 'Api/Usuario/Detalles/' + codigo}`);
      }
      EliminarUsuario(ID): Observable<any>{
        return this.http.delete<any>(`${BASE_URL + 'Api/Usuario/Eliminar/' + ID}`)
      }
      ActualizarUsuario(formData){
        return this.http.put(BASE_URL + 'Api/Usuario/Actualizar/', formData)
      }
  
  }