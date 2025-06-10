export interface IPersonaResponse {
   persona_id: number; // Mapeado como persona_id en la base de datos
   dni: string; // mapeado a apellido_paterno en la base de datos
   nombreCompleto: string; // mapeado a apellido_materno en la base de datos
   apellidoPaterno: string; // mapeado a nombre_completo
   apellidoMaterno: string; // mapeado a fecha_nacimiento
   direccion: string; // mapeado a dni
   sexo: string; // mapeado a direccion_residencia
   telefono: string; // mapeado a sexo
   correoElectronico: string; // mapeado a telefono
   contrasena: string; // mapeado a correo_electronico
   rol: string; // mapeado a contrasena
   estado: boolean; // mapeado a estado
   username: string; // mapeado a username

}
