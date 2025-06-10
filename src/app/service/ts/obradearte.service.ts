import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IObraDeArteRequest } from '../../model/obradearte-request';
import { IObraDeArteResponse } from '../../model/obradearte-response';
import { BASE_URL } from '../../utils/constants';

@Injectable({
  providedIn: 'root',
})
export class ObraDeArteService {
  constructor(private http: HttpClient) {}

  obtenerTodasObras(): Observable<IObraDeArteResponse[]> {
    return this.http.get<IObraDeArteResponse[]>(`${BASE_URL}/obras/obtener`);
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

  obtenerObraPorId(id: number): Observable<IObraDeArteResponse> {
    return this.http.get<IObraDeArteResponse>(`${BASE_URL}/obras/${id}`);
  }

  obtenerObrasPorArtista(idArtista: number): Observable<IObraDeArteResponse[]> {
    return this.http.get<IObraDeArteResponse[]>(`${BASE_URL}/obras/artista/${idArtista}`);
  }

  subirImagen(id: number, archivo: File): Observable<HttpEvent<any>> {
    const formData = new FormData();
    formData.append('file', archivo);

    const req = new HttpRequest('POST', `${BASE_URL}/obras/${id}/imagen`, formData, {
      reportProgress: true,
      responseType: 'json',
    });

    return this.http.request(req);
  }
}

