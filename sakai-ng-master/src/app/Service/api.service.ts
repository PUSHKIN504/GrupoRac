import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public baseUrl = environment.apiBaseUrl;

  constructor() {}
}

export class CompraEndPoint{
    public api = new ApiService();

    public List():string{
        return `${this.api.baseUrl}/Compra/List`;
    }

    public Find(id: number):string{
        return `${this.api.baseUrl}/Compra/Buscar/${id}`;
    }
    
    public Insert():string{
        return `${this.api.baseUrl}/Compra/Insertar`;
    }

    public Update():string{
        return `${this.api.baseUrl}/Compra/Actualizar`;
    }

    public Delete(id: number):string{
        return `${this.api.baseUrl}/Compra/Eliminar/${id}`;
    }

    public Desactivar():string{
        return `${this.api.baseUrl}/Compra/Desactivar`;
    }
}

export class VehiculoEndPoint{
    public api = new ApiService();

    public List():string{
        return `${this.api.baseUrl}/Vehiculo/List`;
    }

    public Find(id: number):string{
        return `${this.api.baseUrl}/Vehiculo/Buscar/${id}`;
    }
    
    public Insert():string{
        return `${this.api.baseUrl}/Vehiculo/Insertar`;
    }

    public Update():string{
        return `${this.api.baseUrl}/Vehiculo/Actualizar`;
    }

    public Delete(id: string):string{
        return `${this.api.baseUrl}/Vehiculo/Eliminar/${id}`;
    }

    public Desactivar():string{
        return `${this.api.baseUrl}/Vehiculo/Desactivar`;
    }
}