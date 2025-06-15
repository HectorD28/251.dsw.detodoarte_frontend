import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IEvaluacionEconomicaRequest } from '../../model/evaluacion-economica-request';  
import { IEvaluacionEconomicaResponse } from '../../model/evaluacion-economica-response';  
import { BASE_URL } from '../../utils/constants';  

@Injectable({
  providedIn: 'root'
})
export class EvaluacionEconomicaService {

  constructor(private http: HttpClient) { }

  // Obtener todas las evaluaciones económicas de una obra específica
  obtenerEvaluacionesPorObra(idObra: number): Observable<IEvaluacionEconomicaResponse[]> {
    return this.http.get<IEvaluacionEconomicaResponse[]>(`${BASE_URL}/evaluaciones/economicas/obra/${idObra}`);
  }

  // Crear una nueva evaluación económica
  crearEvaluacion(evaluacion: IEvaluacionEconomicaRequest): Observable<IEvaluacionEconomicaResponse> {
    return this.http.post<IEvaluacionEconomicaResponse>(`${BASE_URL}/evaluaciones/economicas/crear`, evaluacion);
  }

  // Actualizar una evaluación económica asociada a una obra específica
  actualizarEvaluacion(idObra: number, evaluacion: IEvaluacionEconomicaRequest): Observable<IEvaluacionEconomicaResponse> {
    return this.http.put<IEvaluacionEconomicaResponse>(`${BASE_URL}/evaluaciones/economicas/obra/${idObra}`, evaluacion);
  }

  // Eliminar una evaluación económica asociada a una obra específica
  eliminarEvaluacion(idObra: number): Observable<void> {
    return this.http.delete<void>(`${BASE_URL}/evaluaciones/economicas/obra/${idObra}`);
  }
}
