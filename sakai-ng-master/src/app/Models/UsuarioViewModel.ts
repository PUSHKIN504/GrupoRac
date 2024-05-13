export interface UsuarioD {
    usuarioId: string;
    nombre: string;
    // otros campos relevantes
}

export class Usuario{
    Usu_ID?:Number;
    Usu_Nombre?:String;
    Usu_Apellido?:String;
    Usu_Sexo?:String;
    
    Usu_FechaNacimiento?:String;
    Usu_Telefono?:String;
    Usu_Usua?:String;
    Usu_Contra?:String;
    Est_Id?:Number;
    Sed_Id?:Number;
    Crg_Id?:Number;
    Rol_Id?:Number;
    Admin?:string;
    Ptl_Descripcion?:string;
    Rol_Descripcion?:string;
    Crg_Descripcion?:string;
    Sed_Descripcion?:String;
    
}

export class UsuarioEnviar {
    Usu_ID?:String;
    Usu_Usua: string;
    Usu_Contra: string;  
    Usu_Admin: string;  
    //Empl_Id: string;  
    Rol_Id: string;  

}

export class Fill {
    usu_ID: string;
    usu_Usua: string;
    admin?:String;
    usu_Admin?:String;
    rol_Descripcion:String;
    //empl_Nombre:String;
    //empl_Id:String;
    rol_Id:String;
    usuarioCreacion: string;
    usuarioModificacion: string;
    fechaCreacion : string;
    fechaModificacion : string;
}
