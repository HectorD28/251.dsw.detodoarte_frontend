import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IEspacioGaleriaRequest } from '../../model/espacio-galeria-request';  // Modelo de Request
import { IEspacioGaleriaResponse } from '../../model/espacio-galeria-response';  // Modelo de Response
import { BASE_URL } from '../../utils/constants';  // URL base

@Injectable({
  providedIn: 'root'
})
export class EspacioGaleriaService {

  constructor(private http: HttpClient) { }

  // Obtener todos los espacios de galería
  obtenerTodosEspacios(): Observable<IEspacioGaleriaResponse[]> {
    return this.http.get<IEspacioGaleriaResponse[]>(`${BASE_URL}/espacios/galeria/obtener`);
  }

  // Obtener un espacio de galería por ID
  obtenerEspacioPorId(id: number): Observable<IEspacioGaleriaResponse> {
    return this.http.get<IEspacioGaleriaResponse>(`${BASE_URL}/espacios/galeria/${id}`);
  }

  // Crear un nuevo espacio de galería
  crearEspacio(espacio: IEspacioGaleriaRequest): Observable<IEspacioGaleriaResponse> {
    return this.http.post<IEspacioGaleriaResponse>(`${BASE_URL}/espacios/galeria/crear`, espacio);
  }

  // Actualizar un espacio de galería por ID
  actualizarEspacio(id: number, espacio: IEspacioGaleriaRequest): Observable<IEspacioGaleriaResponse> {
    return this.http.put<IEspacioGaleriaResponse>(`${BASE_URL}/espacios/galeria/${id}`, espacio);
  }

  // Eliminar un espacio de galería por ID
  eliminarEspacio(id: number): Observable<void> {
    return this.http.delete<void>(`${BASE_URL}/espacios/galeria/${id}`);
  }
}
