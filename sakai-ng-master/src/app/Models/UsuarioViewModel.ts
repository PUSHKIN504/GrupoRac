export interface UsuarioD {
    usuarioId: string;
    nombre: string;
    // otros campos relevantes
}

export class Usuario{
    usu_ID?:String;
    usu_Usua?:String;
    usu_Contra?:String;
    rol_Descripcion?:string;
    empl_Nombre?:String;

    usu_Nombre?:String;
    usu_Apellido?:String;
    usu_Sexo?:String;
    
    usu_FechaNacimiento?:String;
    usu_Telefono?:String;

    
    est_Id?:Number;
    sed_Id?:Number;
    crg_Id?:Number;
    rol_Id?:Number;
    Admin?:string;
    ptl_Descripcion?:string;

    crg_Descripcion?:string;
    sed_Descripcion?:String;
    
}

export class UsuarioEnviar {
    Usu_ID?:String;
    Usu_Usua: string;
    Usu_Contra: string;  
    Usu_Admin: string;  
    Empl_Id: string;  
    Rol_Id: string;  

}

export class Reestb{
    Usu_Codigo: string;
  Usu_Contra: string;
  Usu_ID?: string; 
}

export class Fill {
    usu_ID: string;
    usu_Usua: string;
    admin?:String;
    usu_Admin?:String;
    rol_Descripcion:String;
    empl_Nombre:String;
    empl_Id:String;
    rol_Id:String;
    
    usuarioCreacion: string;
    usuarioModificacion: string;
    fechaCreacion : string;
    fechaModificacion : string;
}
