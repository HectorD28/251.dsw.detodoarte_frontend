import { IArtistaResponse } from "./artista-response";

export interface ISolicitudExposicionPresencialResponse{
    idSolicitudExposicionPresencial : number;
    idArtista: IArtistaResponse;
    fechaEmisionSolicitud: string;
    estadoSolicitud: string;
    comentarios: string;
    fechaRecepcionSolicitud: string;
}