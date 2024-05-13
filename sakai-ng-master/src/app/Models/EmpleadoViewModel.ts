export class Empleado{
    ciu_Descripcion?:String;
    esta_EstadoCivil?:String;
    carg_Cargo?:String;
    empl_Id?:String;
    empl_Nombre?:String;
    empl_Apellido?:String;
    empl_Sexo?:String;    
    empl_FechaNac?:String;
    empl_Correo:string;

    empl_DNI?:String;
    Ciu_Descripcion:string;

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
    Muni_Codigo: string;
    Esta_Id: string;
    Carg_Id: string;
    Sucu_Id: string;
    Empl_Correo:string;


}

export class Fill {
    empl_Id: string;
    empl_Nombre: string;
    empl_Apellido?:String;
    empl_FechaNac?:String;
    empl_Sexo?:String;
    muni_Codigo?:String;
    esta_Id?:String;
    carg_Id :string;
    carg_Cargo?:string;
    esta_EstadoCivil?:String;
    muni_Municipio?:String;
    empl_Correo:string;
    empl_DNI?:String;
    depa_Codigo?:String;
    depa_Departamento?:String;
    usuarioCreacion: string;
    usuarioModificacion: string;
    fechaCreacion : string;
    fechaModificacion : string;
}