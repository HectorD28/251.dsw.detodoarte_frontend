import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICriterioEvaluacionEconomicaRequest } from '../../model/criterio-evaluacion-economica-request';
import { ICriterioEvaluacionEconomicaResponse } from '../../model/criterio-evaluacion-economica-response';
import { BASE_URL } from '../../utils/constants';  // Define the base URL for the API

@Injectable({
  providedIn: 'root'
})
export class CriterioEvaluacionEconomicaService {

  constructor(private http: HttpClient) { }

  // Crear un nuevo criterio
  createCriterioEvaluacionEconomica(request: ICriterioEvaluacionEconomicaRequest): Observable<ICriterioEvaluacionEconomicaResponse> {
    return this.http.post<ICriterioEvaluacionEconomicaResponse>(`${BASE_URL}/criterios-evaluacion-economica/crear`, request);
  }

  // Obtener todos los criterios
  getAllCriteriosEvaluacionEconomica(): Observable<ICriterioEvaluacionEconomicaResponse[]> {
    return this.http.get<ICriterioEvaluacionEconomicaResponse[]>(`${BASE_URL}/criterios-evaluacion-economica/obtener`);
  }

  // Obtener un criterio por su ID
  getCriterioEvaluacionEconomicaById(id: number): Observable<ICriterioEvaluacionEconomicaResponse> {
    return this.http.get<ICriterioEvaluacionEconomicaResponse>(`${BASE_URL}/criterios-evaluacion-economica/${id}`);
  }

  // Actualizar un criterio por ID
  updateCriterioEvaluacionEconomica(id: number, request: ICriterioEvaluacionEconomicaRequest): Observable<ICriterioEvaluacionEconomicaResponse> {
    return this.http.put<ICriterioEvaluacionEconomicaResponse>(`${BASE_URL}/criterios-evaluacion-economica/actualizar/${id}`, request);
  }

  // Eliminar un criterio por ID
  deleteCriterioEvaluacionEconomica(id: number): Observable<void> {
    return this.http.delete<void>(`${BASE_URL}/criterios-evaluacion-economica/eliminar/${id}`);
  }
}
