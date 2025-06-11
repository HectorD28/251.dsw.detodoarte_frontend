import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ISolicitudObraRequest } from '../../model/solicitud-obra-request';  // Modelo de Request
import { ISolicitudObraResponse } from '../../model/solicitud-obra-response';  // Modelo de Response
import { BASE_URL } from '../../utils/constants';  // URL base

@Injectable({
  providedIn: 'root'
})
export class SolicitudObraService {

  constructor(private http: HttpClient) { }

  // Obtener todas las solicitudes de obra
  obtenerTodasSolicitudes(): Observable<ISolicitudObraResponse[]> {
    return this.http.get<ISolicitudObraResponse[]>(`${BASE_URL}/solicitudes/obra/obtener`);
  }

  // Obtener una solicitud de obra por ID
  obtenerSolicitudPorId(id: number): Observable<ISolicitudObraResponse> {
    return this.http.get<ISolicitudObraResponse>(`${BASE_URL}/solicitudes/obra/${id}`);
  }

  // Crear una nueva solicitud de obra
  crearSolicitud(solicitud: ISolicitudObraRequest): Observable<ISolicitudObraResponse> {
    return this.http.post<ISolicitudObraResponse>(`${BASE_URL}/solicitudes/obra/crear`, solicitud);
  }

  // Actualizar una solicitud de obra por ID
  actualizarSolicitud(id: number, solicitud: ISolicitudObraRequest): Observable<ISolicitudObraResponse> {
    return this.http.put<ISolicitudObraResponse>(`${BASE_URL}/solicitudes/obra/${id}`, solicitud);
  }

  // Eliminar una solicitud de obra por ID
  eliminarSolicitud(id: number): Observable<void> {
    return this.http.delete<void>(`${BASE_URL}/solicitudes/obra/${id}`);
  }
}
