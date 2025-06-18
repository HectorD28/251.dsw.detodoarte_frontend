import { IObraDeArteResponse } from "./obradearte-response";
import { IEspecialistaResponse } from "./especialista-response";

export interface IEvaluacionArtisticaResponse{
    idEvaluacionArtistica: number;
    obra: IObraDeArteResponse;
    especialista: IEspecialistaResponse;
    fechaEvaluacion: string;
    resultado: string;
    motivoRechazo: string;
    puntaje_final:number;
}