import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IAdministradorRequest } from '../../model/administrador-request';  // Modelo de Request
import { IAdministradorResponse } from '../../model/administrador-response';  // Modelo de Response
import { BASE_URL } from '../../utils/constants';  // URL base

@Injectable({
  providedIn: 'root'
})
export class AdministradorService {

  constructor(private http: HttpClient) { }

  // Obtener todos los administradores
  obtenerTodosAdministradores(): Observable<IAdministradorResponse[]> {
    return this.http.get<IAdministradorResponse[]>(`${BASE_URL}/administradores/obtener`);
  }

  // Obtener un administrador por ID
  obtenerAdministradorPorId(id: number): Observable<IAdministradorResponse> {
    return this.http.get<IAdministradorResponse>(`${BASE_URL}/administradores/${id}`);
  }

  // Crear un nuevo administrador
  crearAdministrador(administrador: IAdministradorRequest): Observable<IAdministradorResponse> {
    return this.http.post<IAdministradorResponse>(`${BASE_URL}/administradores/crear`, administrador);
  }

  // Actualizar un administrador por ID
  actualizarAdministrador(id: number, administrador: IAdministradorRequest): Observable<IAdministradorResponse> {
    return this.http.put<IAdministradorResponse>(`${BASE_URL}/administradores/${id}`, administrador);
  }

  // Eliminar un administrador por ID
  eliminarAdministrador(id: number): Observable<void> {
    return this.http.delete<void>(`${BASE_URL}/administradores/${id}`);
  }
}
