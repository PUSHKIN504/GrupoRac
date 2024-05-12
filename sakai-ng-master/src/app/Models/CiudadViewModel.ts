
export class Municipio{
    ciu_Id?:String;
    ciu_Descripcion?:String;
    departamento?:String;
}


export class MunicipioEnviar {
    Ciu_Id: string;
    Ciu_Descripcion: string;
    Dep_Id: string;
}

export class Fill {
    ciu_Id: string;
    ciu_Descripcion: string;
    dep_Id: string;
    departamento: string;
    usuarioCreacion: string;
    usuarioModificacion: string;
    fechaCreacion : string;
    fechaModificacion : string;
}

export class dropMunicipio{
    value?:String;
    text?:String;
}
