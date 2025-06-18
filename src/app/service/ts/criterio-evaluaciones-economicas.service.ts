import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICriterioEvaluacionesEconomicasRequest } from '../../model/criterio-evaluaciones-economicas-request';
import { ICriterioEvaluacionesEconomicasResponse } from '../../model/criterio-evaluaciones-economicas-response';
import { BASE_URL } from '../../utils/constants';  // Define el base URL para la API

@Injectable({
  providedIn: 'root'
})
export class CriterioEvaluacionesEconomicasService {

  constructor(private http: HttpClient) { }

  // Crear un nuevo criterio de evaluación económica
  createCriterioEvaluacionesEconomicas(request: ICriterioEvaluacionesEconomicasRequest): Observable<ICriterioEvaluacionesEconomicasResponse> {
    return this.http.post<ICriterioEvaluacionesEconomicasResponse>(`${BASE_URL}/criterios-evaluaciones-economicas/crear`, request);
  }

  // Obtener todos los criterios de evaluación económica
  getAllCriteriosEvaluacionesEconomicas(): Observable<ICriterioEvaluacionesEconomicasResponse[]> {
    return this.http.get<ICriterioEvaluacionesEconomicasResponse[]>(`${BASE_URL}/criterios-evaluaciones-economicas/listar`);
  }

  // Obtener un criterio de evaluación económica por ID
  getCriterioEvaluacionesEconomicasById(id: number): Observable<ICriterioEvaluacionesEconomicasResponse> {
    return this.http.get<ICriterioEvaluacionesEconomicasResponse>(`${BASE_URL}/criterios-evaluaciones-economicas/${id}`);
  }

  // Actualizar un criterio de evaluación económica por ID
  updateCriterioEvaluacionesEconomicas(id: number, request: ICriterioEvaluacionesEconomicasRequest): Observable<ICriterioEvaluacionesEconomicasResponse> {
    return this.http.put<ICriterioEvaluacionesEconomicasResponse>(`${BASE_URL}/criterios-evaluaciones-economicas/actualizar/${id}`, request);
  }

  // Eliminar un criterio de evaluación económica por ID
  deleteCriterioEvaluacionesEconomicas(id: number): Observable<void> {
    return this.http.delete<void>(`${BASE_URL}/criterios-evaluaciones-economicas/eliminar/${id}`);
  }
}
