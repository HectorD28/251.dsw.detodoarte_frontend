import { ISolicitudExposicionPresencialResponse } from "./solicitud-exposicion-presencial-response";
import { IEspacioGaleriaResponse } from "./espacio-galeria-response";

export interface IExposicionPresencialResponse{
    idExposicionPresencial: number;
    idSolicitudExposicionPresencial: ISolicitudExposicionPresencialResponse;
    idEspacioGaleria: IEspacioGaleriaResponse;
    fechaInicio: string;
    fechaFin: string;
    tipoExposicion: string;
}