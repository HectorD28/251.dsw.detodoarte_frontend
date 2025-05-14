export interface IPersonaResponse {
   persona_id: number; // Mapeado como persona_id en la base de datos
   dni: string; // mapeado a apellido_paterno en la base de datos
    nombre_completo: string; // mapeado a apellido_materno en la base de datos
    apellido_paterno: string; // mapeado a nombre_completo
    apellido_materno: string; // mapeado a fecha_nacimiento
    direccion_residencia: string; // mapeado a dni
    sexo: string; // mapeado a direccion_residencia
    telefono: string; // mapeado a sexo
    correo_electronico: string;
    contrasena:string; // mapeado a telefono

}
