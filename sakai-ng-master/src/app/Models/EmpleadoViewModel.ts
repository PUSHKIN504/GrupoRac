export class Empleado{
    ciu_Id?:String;
    est_Descripcion?:String;
    crg_Descripcion?:String;
    empl_Id?:String;
    empl_Nombre?:String;
    empl_Apellido?:String;
    empl_Sexo?:String;    
    empl_FechaNac?:String;
    //empl_Correo:string;

    empl_DNI?:String;
    ciu_Descripcion:string;

}

export class dropEmpleado{
    value?:String;
    text?:String;
}

export class EmpleadoEnviar {
    

    Empl_DNI?:String;
    Empl_Id:string;
    Empl_Nombre: string;
    Empl_Apellido: string;
    Empl_FechaNac: string;
    Empl_Sexo: string;
    Ciu_Id: string;
    Est_ID: string;
    Carg_Id: string;
    //Sucu_Id: string;
    //Empl_Correo:string;


}

export class Fill {
    empl_Id: string;
    empl_Nombre: string;
    empl_Apellido?:String;
    empl_FechaNac?:String;
    empl_Sexo?:String;
    ciu_Id?:String;
    est_ID?:String;
    carg_Id:string;
    crg_Descripcion?:string;
    est_Descripcion?:String;
    ciu_Descripcion?:String;
    //empl_Correo:string;
    empl_DNI?:String;
    dep_Id?:String;
    dep_Descripcion?:String;
    usuarioCreacion: string;
    usuarioModificacion: string;
    fechaCreacion : string;
    fechaModificacion : string;
}