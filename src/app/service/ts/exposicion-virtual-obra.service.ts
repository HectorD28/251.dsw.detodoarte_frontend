import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IExposicionVirtualObraRequest } from '../../model/exposicion-virtual-obra-request';  // Modelo de Request
import { IExposicionVirtualObraResponse } from '../../model/exposicion-virtual-obra-response';  // Modelo de Response
import { BASE_URL } from '../../utils/constants';  // URL base

@Injectable({
  providedIn: 'root'
})
export class ExposicionVirtualObraService {

  constructor(private http: HttpClient) { }

  // Obtener todas las exposiciones virtuales con las obras asociadas
  obtenerTodasExposicionesConObras(): Observable<IExposicionVirtualObraResponse[]> {
    return this.http.get<IExposicionVirtualObraResponse[]>(`${BASE_URL}/exposiciones/virtuales/obras/obtener`);
  }

  // Crear una nueva asociación entre exposición virtual y obra
  crearExposicionVirtualObra(request: IExposicionVirtualObraRequest): Observable<IExposicionVirtualObraResponse> {
    return this.http.post<IExposicionVirtualObraResponse>(`${BASE_URL}/exposiciones/virtuales/obras/crear`, request);
  }

  // Eliminar una asociación entre exposición virtual y obra
  eliminarExposicionVirtualObra(id: number): Observable<void> {
    return this.http.delete<void>(`${BASE_URL}/exposiciones/virtuales/obras/${id}`);
  }
}
