import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICriterioEvaluacionArtisticaRequest } from '../../model/criterio-evaluacion-artistica-request';
import { ICriterioEvaluacionArtisticaResponse } from '../../model/criterio-evaluacion-artistica-response';
import { BASE_URL } from '../../utils/constants';  // Define the base URL for the API

@Injectable({
  providedIn: 'root'
})
export class CriterioEvaluacionArtisticaService {

  constructor(private http: HttpClient) { }

  // Crear un nuevo criterio
  createCriterioEvaluacionArtistica(request: ICriterioEvaluacionArtisticaRequest): Observable<ICriterioEvaluacionArtisticaResponse> {
    return this.http.post<ICriterioEvaluacionArtisticaResponse>(`${BASE_URL}/criterios-artisticos`, request);
  }

  // Obtener todos los criterios
  getAllCriteriosEvaluacionArtistica(): Observable<ICriterioEvaluacionArtisticaResponse[]> {
    return this.http.get<ICriterioEvaluacionArtisticaResponse[]>(`${BASE_URL}/criterios-artisticos`);
  }

  // Obtener un criterio por su ID
  getCriterioEvaluacionArtisticaById(id: number): Observable<ICriterioEvaluacionArtisticaResponse> {
    return this.http.get<ICriterioEvaluacionArtisticaResponse>(`${BASE_URL}/criterios-artisticos/${id}`);
  }

  // Obtener criterios de evaluación artística por ID de Técnica
  getCriteriosByTecnica(idTecnica: number): Observable<ICriterioEvaluacionArtisticaResponse[]> {
    return this.http.get<ICriterioEvaluacionArtisticaResponse[]>(`${BASE_URL}/criterios-artisticos/tecnica/${idTecnica}`);
  }

  // Actualizar un criterio por ID
  updateCriterioEvaluacionArtistica(id: number, request: ICriterioEvaluacionArtisticaRequest): Observable<ICriterioEvaluacionArtisticaResponse> {
    return this.http.put<ICriterioEvaluacionArtisticaResponse>(`${BASE_URL}/criterios-artisticos/${id}`, request);
  }

  // Eliminar un criterio por ID
  deleteCriterioEvaluacionArtistica(id: number): Observable<void> {
    return this.http.delete<void>(`${BASE_URL}/criterios-artisticos/${id}`);
  }
}
