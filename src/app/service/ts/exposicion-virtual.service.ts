import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IExposicionVirtualRequest } from '../../model/exposicion-virtual-request';  // Modelo de Request
import { IExposicionVirtualResponse } from '../../model/exposicion-virtual-response';  // Modelo de Response
import { BASE_URL } from '../../utils/constants';  // URL base

@Injectable({
  providedIn: 'root'
})
export class ExposicionVirtualService {

  constructor(private http: HttpClient) { }

  // Obtener todas las exposiciones virtuales
  obtenerTodasExposiciones(): Observable<IExposicionVirtualResponse[]> {
    return this.http.get<IExposicionVirtualResponse[]>(`${BASE_URL}/exposiciones/virtuales/obtener`);
  }

  // Obtener una exposición virtual por ID
  obtenerExposicionPorId(id: number): Observable<IExposicionVirtualResponse> {
    return this.http.get<IExposicionVirtualResponse>(`${BASE_URL}/exposiciones/virtuales/${id}`);
  }

  // Crear una nueva exposición virtual
  crearExposicion(exposicion: IExposicionVirtualRequest): Observable<IExposicionVirtualResponse> {
    return this.http.post<IExposicionVirtualResponse>(`${BASE_URL}/exposiciones/virtuales/crear`, exposicion);
  }

  // Actualizar una exposición virtual por ID
  actualizarExposicion(id: number, exposicion: IExposicionVirtualRequest): Observable<IExposicionVirtualResponse> {
    return this.http.put<IExposicionVirtualResponse>(`${BASE_URL}/exposiciones/virtuales/${id}`, exposicion);
  }

  // Eliminar una exposición virtual por ID
  eliminarExposicion(id: number): Observable<void> {
    return this.http.delete<void>(`${BASE_URL}/exposiciones/virtuales/${id}`);
  }
}
