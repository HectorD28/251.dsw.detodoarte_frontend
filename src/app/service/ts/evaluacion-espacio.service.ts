import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IEvaluacionEspacioRequest } from '../../model/evaluacion-espacio-request';  // Modelo de Request
import { IEvaluacionEspacioResponse } from '../../model/evaluacion-espacio-response';  // Modelo de Response
import { BASE_URL } from '../../utils/constants';  // URL base

@Injectable({
  providedIn: 'root'
})
export class EvaluacionEspacioService {

  constructor(private http: HttpClient) { }

  // Obtener todas las evaluaciones de espacio de una obra específica
  obtenerEvaluacionesPorObra(idObra: number): Observable<IEvaluacionEspacioResponse[]> {
    return this.http.get<IEvaluacionEspacioResponse[]>(`${BASE_URL}/evaluaciones/espacio/obra/${idObra}`);
  }

  // Crear una nueva evaluación de espacio
  crearEvaluacion(evaluacion: IEvaluacionEspacioRequest): Observable<IEvaluacionEspacioResponse> {
    return this.http.post<IEvaluacionEspacioResponse>(`${BASE_URL}/evaluaciones/espacio/crear`, evaluacion);
  }

  // Actualizar una evaluación de espacio por ID
  actualizarEvaluacion(id: number, evaluacion: IEvaluacionEspacioRequest): Observable<IEvaluacionEspacioResponse> {
    return this.http.put<IEvaluacionEspacioResponse>(`${BASE_URL}/evaluaciones/espacio/${id}`, evaluacion);
  }

  // Eliminar una evaluación de espacio por ID
  eliminarEvaluacion(id: number): Observable<void> {
    return this.http.delete<void>(`${BASE_URL}/evaluaciones/espacio/${id}`);
  }
}
