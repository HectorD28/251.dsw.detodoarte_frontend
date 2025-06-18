import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IEspecialistaRequest } from '../../model/especialista-request';  // Modelo de Request
import { IEspecialistaResponse } from '../../model/especialista-response';  // Modelo de Response
import { BASE_URL } from '../../utils/constants';  // URL base
import { IEvaluacionArtisticaResponse } from '../../model/evaluacion-artistica-response'; // Modelo para solicitudes artísticas
import { IEvaluacionEconomicaResponse } from '../../model/evaluacion-economica-response'; // Modelo para solicitudes económicas

@Injectable({
  providedIn: 'root'
})
export class EspecialistaService {

  constructor(private http: HttpClient) { }

  // Obtener todos los especialistas
  obtenerTodosEspecialistas(): Observable<IEspecialistaResponse[]> {
    return this.http.get<IEspecialistaResponse[]>(`${BASE_URL}/especialistas/obtener`);
  }

  // Obtener un especialista por ID
  obtenerEspecialistaPorId(id: number): Observable<IEspecialistaResponse> {
    return this.http.get<IEspecialistaResponse>(`${BASE_URL}/especialistas/${id}`);
  }

  // Obtener especialistas por técnica
  obtenerEspecialistasPorTecnica(idTecnica: number): Observable<IEspecialistaResponse[]> {
    return this.http.get<IEspecialistaResponse[]>(`${BASE_URL}/especialistas/por-tecnica/${idTecnica}`);
  }

  // Obtener solicitudes de revisión artísticas para un especialista
  obtenerSolicitudesDeRevisionArtistica(idEspecialista: number): Observable<IEvaluacionArtisticaResponse[]> {
    return this.http.get<IEvaluacionArtisticaResponse[]>(`${BASE_URL}/especialistas/solicitudes-revision-artistica/${idEspecialista}`);
  }

  // Obtener solicitudes de revisión económicas para un especialista
  obtenerSolicitudesDeRevisionEconomica(idEspecialista: number): Observable<IEvaluacionEconomicaResponse[]> {
    return this.http.get<IEvaluacionEconomicaResponse[]>(`${BASE_URL}/especialistas/solicitudes-revision-economica/${idEspecialista}`);
  }

  // Crear un nuevo especialista
  crearEspecialista(especialista: IEspecialistaRequest): Observable<IEspecialistaResponse> {
    return this.http.post<IEspecialistaResponse>(`${BASE_URL}/especialistas/crear`, especialista);
  }

  // Actualizar un especialista
  actualizarEspecialista(id: number, especialista: IEspecialistaRequest): Observable<IEspecialistaResponse> {
    return this.http.put<IEspecialistaResponse>(`${BASE_URL}/especialistas/edit/${id}`, especialista);
  }

  // Eliminar un especialista
  eliminarEspecialista(id: number): Observable<void> {
    return this.http.delete<void>(`${BASE_URL}/especialistas/${id}`);
  }
}
