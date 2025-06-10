import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IArtistaRequest } from '../../model/artista-request';
import { IArtistaResponse } from '../../model/artista-response';
import { BASE_URL } from '../../utils/constants';

@Injectable({
  providedIn: 'root'
})
export class ArtistaService {

  constructor(private http: HttpClient) { }

  // Cambié el nombre a obtenerTodas para indicar que trae todas las artistas
  obtenerTodas(): Observable<IArtistaResponse[]> {
    return this.http.get<IArtistaResponse[]>(`${BASE_URL}/artistas`);
  }

  registrarArtista(artista: IArtistaRequest): Observable<IArtistaResponse> {
    console.log(artista);
    return this.http.post<IArtistaResponse>(`${BASE_URL}/artistas`, artista);
  }

  getArtista(): Observable<IArtistaResponse[]> {
    return this.http.get<IArtistaResponse[]>(`${BASE_URL}/artistas`);
  }

}
