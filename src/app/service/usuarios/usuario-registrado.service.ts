import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { IUsuarioRegistradoResponse } from '../../model/usuarios/usuario-registrado-response';

@Injectable({
  providedIn: 'root'
})
export class UsuarioRegistradoService {
  private BASE_URL: string = '';

  constructor(private http: HttpClient) {
    this.BASE_URL = environment.url;
  }

  // Metodo para obtener los usarios registrados
  obtenerUsuariosRegistrados() : Observable<IUsuarioRegistradoResponse[]> {
    console.log('Obteniendo usuarios registrados desde el servicio');
    return this.http.get<IUsuarioRegistradoResponse[]>(`${this.BASE_URL}/usuarios/listar`);
  }

  //Metodo para obtener un usuario registrado por su DNI
  obtenerUsuarioRegistradoPorDni(dni: string): Observable<IUsuarioRegistradoResponse> {
    console.log(`Obteniendo usuario registrado con DNI: ${dni}`);
    return this.http.get<IUsuarioRegistradoResponse>(`${this.BASE_URL}/usuarios/buscar/${dni}`);
  }

  // Metodo para buscar usuarios registrados segun su ROL
  obtenerUsuariosRegistradosPorRol(rol: string): Observable<IUsuarioRegistradoResponse[]> {
    console.log(`Obteniendo usuarios registrados con rol: ${rol}`);
    return this.http.get<IUsuarioRegistradoResponse[]>(`${this.BASE_URL}/usuarios/buscar/rol/${rol}`);
  }

  // Metodo para actualizar un usuario registrado
  actualizarUsuarioRegistrado(usuario: IUsuarioRegistradoResponse): Observable<IUsuarioRegistradoResponse> {
    console.log(`Actualizando usuario registrado con DNI: ${usuario.dni}`);
    return this.http.put<IUsuarioRegistradoResponse>(`${this.BASE_URL}/usuarios/actualizar/${usuario.dni}`, usuario);
  }

  // Metodo para eliminar un usuario registrado
  eliminarUsuarioRegistrado(dni: string): Observable<void> {
    console.log(`Eliminando usuario registrado con DNI: ${dni}`);
    return this.http.delete<void>(`${this.BASE_URL}/usuarios/eliminar/${dni}`);
  }
}
