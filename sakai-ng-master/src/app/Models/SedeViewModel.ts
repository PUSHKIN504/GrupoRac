export class Sede{
    sed_Id?:number;
    sed_Descripcion?:string;
    ciu_Id?:string;

}

export class SedeEnviar {
    Sed_Id: String;
    Sed_Descripcion: string;
    Ciu_Id: string  
}

export class dropSucursal{
    value?:String;
    text?:String;
}

export class Fill {
    sed_Id?: String;
    sed_Descripcion?: String;
    ciu_Id: string; 
    ciu_Descipcion?:String;
    dep_Id?:String;
    usuarioCreacion?:String;
    usuarioModificacion:String;
    fechaCreacion:String;
    fechaModificacion:String;
}

export class DropSucursal{
    sed_Id?:String;
    sed_Descripcion?:String;

}