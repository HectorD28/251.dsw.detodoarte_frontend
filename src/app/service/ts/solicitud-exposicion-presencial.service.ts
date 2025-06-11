import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ISolicitudExposicionPresencialRequest } from '../../model/solicitud-exposicion-presencial-request';  // Modelo de Request
import { ISolicitudExposicionPresencialResponse } from '../../model/solicitud-exposicion-presencial-response';  // Modelo de Response
import { BASE_URL } from '../../utils/constants';  // URL base

@Injectable({
  providedIn: 'root'
})
export class SolicitudExposicionPresencialService {

  constructor(private http: HttpClient) { }

  // Obtener todas las solicitudes de exposición
  obtenerTodasSolicitudes(): Observable<ISolicitudExposicionPresencialResponse[]> {
    return this.http.get<ISolicitudExposicionPresencialResponse[]>(`${BASE_URL}/solicitudes/exposicion/obtener`);
  }

  // Obtener una solicitud de exposición por ID
  obtenerSolicitudPorId(id: number): Observable<ISolicitudExposicionPresencialResponse> {
    return this.http.get<ISolicitudExposicionPresencialResponse>(`${BASE_URL}/solicitudes/exposicion/${id}`);
  }

  // Crear una nueva solicitud de exposición
  crearSolicitud(solicitud: ISolicitudExposicionPresencialRequest): Observable<ISolicitudExposicionPresencialResponse> {
    return this.http.post<ISolicitudExposicionPresencialResponse>(`${BASE_URL}/solicitudes/exposicion/crear`, solicitud);
  }

  // Actualizar una solicitud de exposición
  actualizarSolicitud(id: number, solicitud: ISolicitudExposicionPresencialRequest): Observable<ISolicitudExposicionPresencialResponse> {
    return this.http.put<ISolicitudExposicionPresencialResponse>(`${BASE_URL}/solicitudes/exposicion/${id}`, solicitud);
  }

  // Eliminar una solicitud de exposición por ID
  eliminarSolicitud(id: number): Observable<void> {
    return this.http.delete<void>(`${BASE_URL}/solicitudes/exposicion/${id}`);
  }
}
