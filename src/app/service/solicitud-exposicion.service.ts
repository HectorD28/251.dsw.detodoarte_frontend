import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BASE_URL } from '../utils/constants';

@Injectable({ providedIn: 'root' })
export class SolicitudExposicionService {
  private apiUrl = `${BASE_URL}/solicitudes-exposicion`;

  constructor(private http: HttpClient) {}

  crearSolicitud(request: any): Observable<any> {
    return this.http.post(this.apiUrl, request);
  }
}