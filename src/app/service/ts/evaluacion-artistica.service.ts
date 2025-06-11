import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IEvaluacionArtisticaRequest } from '../../model/evaluacion-artistica-request';  // Modelo de Request
import { IEvaluacionArtisticaResponse } from '../../model/evaluacion-artistica-response';  // Modelo de Response
import { BASE_URL } from '../../utils/constants';  // URL base

@Injectable({
  providedIn: 'root'
})
export class EvaluacionArtisticaService {

  constructor(private http: HttpClient) { }

  // Obtener todas las evaluaciones artísticas de una obra específica
  obtenerEvaluacionesPorObra(idObra: number): Observable<IEvaluacionArtisticaResponse[]> {
    return this.http.get<IEvaluacionArtisticaResponse[]>(`${BASE_URL}/evaluaciones/artisticas/obra/${idObra}`);
  }

  // Crear una nueva evaluación artística
  crearEvaluacion(evaluacion: IEvaluacionArtisticaRequest): Observable<IEvaluacionArtisticaResponse> {
    return this.http.post<IEvaluacionArtisticaResponse>(`${BASE_URL}/evaluaciones/artisticas/crear`, evaluacion);
  }

  // Actualizar una evaluación artística
  actualizarEvaluacion(id: number, evaluacion: IEvaluacionArtisticaRequest): Observable<IEvaluacionArtisticaResponse> {
    return this.http.put<IEvaluacionArtisticaResponse>(`${BASE_URL}/evaluaciones/artisticas/${id}`, evaluacion);
  }

  // Eliminar una evaluación artística
  eliminarEvaluacion(id: number): Observable<void> {
    return this.http.delete<void>(`${BASE_URL}/evaluaciones/artisticas/${id}`);
  }
}
