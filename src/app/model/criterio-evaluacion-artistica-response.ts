import { ITecnicaResponse } from "./tecnica-response";

export interface ICriterioEvaluacionArtisticaResponse {
  idCriterioEvaluacionArtistica: number;
  tecnica: ITecnicaResponse;
  nombre_criterio: string;  // Temporalmente obligatorio
  descripcion: string;
}