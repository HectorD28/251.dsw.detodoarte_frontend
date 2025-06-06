import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BASE_URL } from '../utils/constants';
import { ISolicitudExposicionResponse } from '../model/solicitud-exposicion-response';

@Injectable({ providedIn: 'root' })
export class SolicitudExposicionService {
  private apiUrl = `${BASE_URL}/solicitudexposicion`;

  constructor(private http: HttpClient) {}

  crearSolicitud(request: any): Observable<any> {
    return this.http.post(this.apiUrl, request);
  }

  obtenerSolicitudes(): Observable<ISolicitudExposicionResponse[]> {
    return this.http.get<ISolicitudExposicionResponse[]>(`${this.apiUrl}/obtener`);
  }
}