import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IEvaluacionArtisticaRequest } from '../../model/evaluacion-artistica-request'; 
import { IEvaluacionArtisticaResponse } from '../../model/evaluacion-artistica-response'; 
import { BASE_URL } from '../../utils/constants';  

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

  // Actualizar una evaluación artística asociada a una obra específica
  actualizarEvaluacion(idObra: number, evaluacion: IEvaluacionArtisticaRequest): Observable<IEvaluacionArtisticaResponse> {
    return this.http.put<IEvaluacionArtisticaResponse>(`${BASE_URL}/evaluaciones/artisticas/obra/${idObra}`, evaluacion);
  }

  // Eliminar una evaluación artística asociada a una obra específica
  eliminarEvaluacion(idObra: number): Observable<void> {
    return this.http.delete<void>(`${BASE_URL}/evaluaciones/artisticas/obra/${idObra}`);
  }

  getEvaluacionesArtisticasPorEspecialista(idEspecialista: number): Observable<IEvaluacionArtisticaResponse[]> {
    return this.http.get<IEvaluacionArtisticaResponse[]>(`${BASE_URL}/evaluaciones/artisticas/todos/${idEspecialista}`);
  }
}
