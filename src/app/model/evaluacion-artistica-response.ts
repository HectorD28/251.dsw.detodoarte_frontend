import { IObraDeArteResponse } from "./obradearte-response";
import { IEspecialistaResponse } from "./especialista-response";

export interface IEvaluacionArtisticaResponse{
    idEvaluacionArtistica: number;
    idObra: IObraDeArteResponse;
    idEspecialista: IEspecialistaResponse;
    fechaEvaluacion: string;
    resultado: string;
    motivoRechazo: string;
}