import { IArtistaResponse } from "./artista-response";

export interface ISolicitudExposicionPresencialResponse{
    idSolicitudExposicionPresencial : number;
    idArtista: IArtistaResponse;
    fechaEmisionSolicitud: string;
    EstadoSolicitud: string;
    comentarios: string;
    fechaRecepcionSolicitud: string;
}