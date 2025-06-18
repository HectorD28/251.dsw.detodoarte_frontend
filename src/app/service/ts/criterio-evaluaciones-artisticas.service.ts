import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICriterioEvaluacionesArtisticasRequest } from '../../model/criterio-evaluaciones-artisticas-request';
import { ICriterioEvaluacionesArtisticasResponse } from '../../model/criterio-evaluaciones-artisticas-response';
import { BASE_URL } from '../../utils/constants';  // Define el base URL para la API

@Injectable({
  providedIn: 'root'
})
export class CriterioEvaluacionesArtisticasService {

  constructor(private http: HttpClient) { }

  // Crear un nuevo criterio de evaluación artística
  createCriterioEvaluacionesArtisticas(request: ICriterioEvaluacionesArtisticasRequest): Observable<ICriterioEvaluacionesArtisticasResponse> {
    return this.http.post<ICriterioEvaluacionesArtisticasResponse>(`${BASE_URL}/criterios-evaluaciones-artisticas/crear`, request);
  }

  // Obtener todos los criterios de evaluación artística
  getAllCriteriosEvaluacionesArtisticas(): Observable<ICriterioEvaluacionesArtisticasResponse[]> {
    return this.http.get<ICriterioEvaluacionesArtisticasResponse[]>(`${BASE_URL}/criterios-evaluaciones-artisticas/listar`);
  }

  // Obtener un criterio de evaluación artística por ID
  getCriterioEvaluacionesArtisticasById(id: number): Observable<ICriterioEvaluacionesArtisticasResponse> {
    return this.http.get<ICriterioEvaluacionesArtisticasResponse>(`${BASE_URL}/criterios-evaluaciones-artisticas/${id}`);
  }

  // Actualizar un criterio de evaluación artística por ID
  updateCriterioEvaluacionesArtisticas(id: number, request: ICriterioEvaluacionesArtisticasRequest): Observable<ICriterioEvaluacionesArtisticasResponse> {
    return this.http.put<ICriterioEvaluacionesArtisticasResponse>(`${BASE_URL}/criterios-evaluaciones-artisticas/actualizar/${id}`, request);
  }

  // Eliminar un criterio de evaluación artística por ID
  deleteCriterioEvaluacionesArtisticas(id: number): Observable<void> {
    return this.http.delete<void>(`${BASE_URL}/criterios-evaluaciones-artisticas/eliminar/${id}`);
  }

  verificarCombinacion(idEvaluacionArtistica: number, idCriterioEvaluacionArtistica: number): Observable<boolean> {
    return this.http.get<boolean>(`${BASE_URL}/verificar-combinacion/${idEvaluacionArtistica}/${idCriterioEvaluacionArtistica}`);
  }
}
