import { IEvaluacionArtisticaResponse } from "./evaluacion-artistica-response";
import { ICriterioEvaluacionArtisticaResponse } from "./criterio-evaluacion-artistica-response";
export interface ICriterioEvaluacionesArtisticasResponse {
  idCriterioEvaluacionesArtisticas: number;
  criterioEvaluacionArtisitica: ICriterioEvaluacionArtisticaResponse;
  evaluacionArtistica: IEvaluacionArtisticaResponse;  // Temporalmente obligatorio
  puntaje_criterio: number;
}