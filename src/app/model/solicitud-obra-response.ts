import { ISolicitudExposicionPresencialResponse } from "./solicitud-exposicion-presencial-response";
import { IObraDeArteResponse } from "./obradearte-response";

export interface ISolicitudObraResponse{
    idSolicitudObra: number;
    SolicitudExposicionPresencial: ISolicitudExposicionPresencialResponse;
    idObra: IObraDeArteResponse;
}