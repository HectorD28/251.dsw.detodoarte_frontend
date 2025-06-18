import { IEvaluacionEconomicaResponse } from "./evaluacion-economica-response";
import { ICriterioEvaluacionEconomicaResponse } from "./criterio-evaluacion-economica-response";

export interface ICriterioEvaluacionesEconomicasResponse{
  idCriterioEvalacuionesEconomicas: number;
  evaluacionEconomica: IEvaluacionEconomicaResponse;
  criterioEvaluacionEconomica: ICriterioEvaluacionEconomicaResponse;  // Temporalmente obligatorio
  precioCriterio: number;
}