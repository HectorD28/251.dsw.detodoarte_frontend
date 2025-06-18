import { IObraDeArteResponse } from "./obradearte-response";
import { IEspecialistaResponse } from "./especialista-response";

export interface IEvaluacionEconomicaResponse{
    idEvaluacionEconomica: number;
    obra: IObraDeArteResponse;
    especialista: IEspecialistaResponse;
    precioVenta: number;
    porcentajeGanancia: number;
    fechaEvaluacion: string;
    resultado: string;
    motivoRechazo: string;
}