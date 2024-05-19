export class Cliente{
    cli_Id?:String;
    cli_DNI?:String;
    cli_Nombre?:String;
    cli_Apellido?:String;
    cli_FechaNac?:String;
    cli_Sexo?:String;
    clie_Sexo ?:String;
    est_Descripcion?:String;
    crg_Descripcion?:String;
    cli_Direccion?:String;
    ciu_Id?:String;
    ciu_Descripcion:string;

    //Muni_Municipio?:String;
    //municipio?:String;
    //dep_Descripcion?:String;
}

export class ClienteEnviar {
    Usu_ID?: Number;
    Cli_Id: string;
    Cli_DNI?:String;
    Cli_Nombre: string;
    Cli_Apellido: string;
    Cli_FechaNac: string;
    Cli_Sexo: string;
    Ciu_Id: string;
    Est_ID: string;
    //Cli_Direccion?:String;
}

export class dcliente{
    nombreCompleto:string;
    totalGastado:string;
}

export class Fill {

    cli_Id: string;
    cli_Nombre: string;
    cli_Apellido?:String;
    cli_FechaNac?:String;
    cli_Sexo?:String;
    ciu_Id?:String;
    ciu_Descripcion?:String;
    crg_Descripcion: string;
    est_ID?:String;
    est_Descripcion?:String;
    cli_DNI?:String;
    dep_Id?:String;
    dep_Descripcion?:String;
    usuarioCreacion: string;
    usuarioModificacion: string;
    fechaCreacion : string;
    fechaModificacion : string;
}
