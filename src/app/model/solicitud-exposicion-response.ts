export interface ISolicitudExposicionResponse {
    id_solicitud: number;
    fecha_emision_solicitud: string; // Usa string si viene como texto, o Date si lo conviertes
    estadoSolicitud: string;
    comentarios: string;
    artista: any; // Puedes tipar mejor si tienes el modelo Artista
    fecha_recepcion_solicitud: string;
}
