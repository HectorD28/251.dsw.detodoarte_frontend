import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IEspecialistaRequest } from '../../model/especialista-request';  // Modelo de Request
import { IEspecialistaResponse } from '../../model/especialista-response';  // Modelo de Response
import { BASE_URL } from '../../utils/constants';  // URL base

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
