export class Cliente{
    cli_Id?:Number;
    cli_Nombre?:String;
    cli_DNI?:String;
    ciu_Id?:String;
    Muni_Municipio?:String;
    cli_Direccion?:String;
    municipio?:String;

    // dep_Descripcion?:String;
}

export class ClienteEnviar {
    Cli_Id: string;
    Cli_DNI?:String;
    Cli_Nombre: string;
    //Clie_Apellido: string;
    //Clie_FechaNac: string;
    //Clie_Sexo: string;
    Ciu_Id: string;
    //Esta_Id: string;
    Cli_Direccion?:String;
}


export class Fill {
    cli_Id: string;
    cli_Nombre: string;
    //clie_Apellido?:String;
    //clie_FechaNac?:String;
    //clie_Sexo?:String;
    ciu_Id?:String;
    ciu_Descripcion?:String;
    //carg_Cargo: string;
    //esta_Id?:String;
    //esta_EstadoCivil?:String;
    cli_DNI?:String;
    //depa_Codigo?:String;
    //depa_Departamento?:String;
    usuarioCreacion: string;
    usuarioModificacion: string;
    fechaCreacion : string;
    fechaModificacion : string;
}
