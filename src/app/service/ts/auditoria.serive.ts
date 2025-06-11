import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IAuditoriaRequest } from '../../model/auditoria-request';  // Modelo de Request
import { IAuditoriaResponse } from '../../model/auditoria-response';  // Modelo de Response
import { BASE_URL } from '../../utils/constants';  // URL base

@Injectable({
  providedIn: 'root'
})
export class AuditoriaService {

  constructor(private http: HttpClient) { }

  // Obtener todas las auditorías
  obtenerTodasAuditorias(): Observable<IAuditoriaResponse[]> {
    return this.http.get<IAuditoriaResponse[]>(`${BASE_URL}/auditoria/obtener`);
  }

  // Obtener una auditoría por ID
  obtenerAuditoriaPorId(id: number): Observable<IAuditoriaResponse> {
    return this.http.get<IAuditoriaResponse>(`${BASE_URL}/auditoria/${id}`);
  }

  // Registrar un nuevo registro en la auditoría
  registrarAuditoria(auditoria: IAuditoriaRequest): Observable<void> {
    return this.http.post<void>(`${BASE_URL}/auditoria/registrar`, auditoria);
  }

  // Actualizar una auditoría por ID
  actualizarAuditoria(id: number, auditoria: IAuditoriaRequest): Observable<IAuditoriaResponse> {
    return this.http.put<IAuditoriaResponse>(`${BASE_URL}/auditoria/${id}`, auditoria);
  }

  // Eliminar una auditoría por ID
  eliminarAuditoria(id: number): Observable<void> {
    return this.http.delete<void>(`${BASE_URL}/auditoria/${id}`);
  }
}
