import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IObraDeArteRequest } from '../../model/obradearte-request';  // Modelo de Request
import { IObraDeArteResponse } from '../../model/obradearte-response';  // Modelo de Response
import { BASE_URL } from '../../utils/constants';  // URL base

@Injectable({
  providedIn: 'root'
})
export class ObraDeArteService {

  constructor(private http: HttpClient) { }

  // Obtener todas las obras de arte
  obtenerTodasObras(): Observable<IObraDeArteResponse[]> {
    return this.http.get<IObraDeArteResponse[]>(`${BASE_URL}/obras/obtener`);
  }

  // Obtener una obra de arte por ID
  obtenerObraPorId(id: number): Observable<IObraDeArteResponse> {
    return this.http.get<IObraDeArteResponse>(`${BASE_URL}/obras/${id}`);
  }

  // Obtener todas las obras de arte de un artista
  obtenerObrasPorArtista(idArtista: number): Observable<IObraDeArteResponse[]> {
    return this.http.get<IObraDeArteResponse[]>(`${BASE_URL}/obras/artista/${idArtista}`);
  }

  // Crear una nueva obra de arte
  crearObra(obra: IObraDeArteRequest): Observable<IObraDeArteResponse> {
    return this.http.post<IObraDeArteResponse>(`${BASE_URL}/obras/crear`, obra);
  }

  // Actualizar una obra de arte por ID
  actualizarObra(id: number, obra: IObraDeArteRequest): Observable<IObraDeArteResponse> {
    return this.http.put<IObraDeArteResponse>(`${BASE_URL}/obras/${id}`, obra);
  }

  // Eliminar una obra de arte por ID
  eliminarObra(id: number): Observable<void> {
    return this.http.delete<void>(`${BASE_URL}/obras/${id}`);
  }
}
