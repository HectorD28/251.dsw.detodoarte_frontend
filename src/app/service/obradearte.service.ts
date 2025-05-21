import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IObraDeArteRequest } from '../model/obradearte-request';
import { IObraDeArteResponse } from '../model/obradearte-response';
import { BASE_URL } from '../utils/constants';

@Injectable({
  providedIn: 'root',
})
export class ObraDeArteService {
  constructor(private http: HttpClient) {}

  obtenerTodasObras(): Observable<IObraDeArteResponse[]> {
    return this.http.get<IObraDeArteResponse[]>(`${BASE_URL}/obras/obtener`);
  }

  obtenerObraPorId(id: number): Observable<IObraDeArteResponse> {
    return this.http.get<IObraDeArteResponse>(`${BASE_URL}/obras/${id}`);
  }

  obtenerObrasPorArtista(idArtista: number): Observable<IObraDeArteResponse[]> {
    return this.http.get<IObraDeArteResponse[]>(`${BASE_URL}/obras/artista/${idArtista}`);
  }

  registrarObra(obra: IObraDeArteRequest): Observable<IObraDeArteResponse> {
    return this.http.post<IObraDeArteResponse>(`${BASE_URL}/obras/crear`, obra);
  }

  eliminarObra(id: number): Observable<void> {
    return this.http.delete<void>(`${BASE_URL}/obras/${id}`);
  }

  actualizarObra(id: number, obra: IObraDeArteRequest): Observable<IObraDeArteResponse> {
    return this.http.put<IObraDeArteResponse>(`${BASE_URL}/obras/${id}`, obra);
  }
}
