import { ITecnicaResponse } from "./tecnica-response";

export interface ICriterioEvaluacionEconomicaResponse {
  idCriterioEvaluacionEconomica: number;
  tecnica: ITecnicaResponse;
  nombreCriterio: string;  // Temporalmente obligatorio
  descripcion: string;
}