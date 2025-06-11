import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IExposicionPresencialRequest } from '../../model/exposicion-presencial-request';  // Modelo de Request
import { IExposicionPresencialResponse } from '../../model/exposicion-presencial-response';  // Modelo de Response
import { BASE_URL } from '../../utils/constants';  // URL base

@Injectable({
  providedIn: 'root'
})
export class ExposicionPresencialService {

  constructor(private http: HttpClient) { }

  // Obtener todas las exposiciones presenciales
  obtenerTodasExposiciones(): Observable<IExposicionPresencialResponse[]> {
    return this.http.get<IExposicionPresencialResponse[]>(`${BASE_URL}/exposiciones/presenciales/obtener`);
  }

  // Obtener una exposición presencial por ID
  obtenerExposicionPorId(id: number): Observable<IExposicionPresencialResponse> {
    return this.http.get<IExposicionPresencialResponse>(`${BASE_URL}/exposiciones/presenciales/${id}`);
  }

  // Crear una nueva exposición presencial
  crearExposicion(exposicion: IExposicionPresencialRequest): Observable<IExposicionPresencialResponse> {
    return this.http.post<IExposicionPresencialResponse>(`${BASE_URL}/exposiciones/presenciales/crear`, exposicion);
  }

  // Actualizar una exposición presencial por ID
  actualizarExposicion(id: number, exposicion: IExposicionPresencialRequest): Observable<IExposicionPresencialResponse> {
    return this.http.put<IExposicionPresencialResponse>(`${BASE_URL}/exposiciones/presenciales/${id}`, exposicion);
  }

  // Eliminar una exposición presencial por ID
  eliminarExposicion(id: number): Observable<void> {
    return this.http.delete<void>(`${BASE_URL}/exposiciones/presenciales/${id}`);
  }
}
