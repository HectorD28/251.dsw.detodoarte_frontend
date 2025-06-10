import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IArtistaRequest } from '../../model/artista-request';  // Modelo de Request
import { IArtistaResponse } from '../../model/artista-response';  // Modelo de Response
import { BASE_URL } from '../../utils/constants';  // URL base

@Injectable({
  providedIn: 'root'
})
export class ArtistaService {

  constructor(private http: HttpClient) { }

  // Obtener todos los artistas
  obtenerTodosArtistas(): Observable<IArtistaResponse[]> {
    return this.http.get<IArtistaResponse[]>(`${BASE_URL}/artistas/obtener`);
  }

  // Obtener un artista por ID
  obtenerArtistaPorId(id: number): Observable<IArtistaResponse> {
    return this.http.get<IArtistaResponse>(`${BASE_URL}/artistas/${id}`);
  }

  // Crear un nuevo artista
  crearArtista(artista: IArtistaRequest): Observable<IArtistaResponse> {
    return this.http.post<IArtistaResponse>(`${BASE_URL}/artistas/crear`, artista);
  }

  // Actualizar un artista
  actualizarArtista(id: number, artista: IArtistaRequest): Observable<IArtistaResponse> {
    return this.http.put<IArtistaResponse>(`${BASE_URL}/artistas/edit/${id}`, artista);
  }

  // Eliminar un artista
  eliminarArtista(id: number): Observable<void> {
    return this.http.delete<void>(`${BASE_URL}/artistas/${id}`);
  }
}
