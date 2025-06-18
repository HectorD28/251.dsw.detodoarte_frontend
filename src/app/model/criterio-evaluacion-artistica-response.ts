import { ITecnicaResponse } from "./tecnica-response";

export interface ICriterioEvaluacionArtisticaResponse {
  idCriterioEvaluacionArtistica: number;
  tecnica: ITecnicaResponse;
  nombreCriterio: string;  // Temporalmente obligatorio
  descripcion: string;
}