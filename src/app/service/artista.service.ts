import { IPersonaRequest } from './../model/persona-request';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import{IArtistaRequest} from '../model/artista-request';
import { BASE_URL } from '../utils/constants';
import { Observable } from 'rxjs';
import { IArtistaResponse } from '../model/artista-response';
@Injectable({
  providedIn: 'root'
})
export class ArtistaService {

  constructor(private http:HttpClient) { }
  getArtista(): Observable<IArtistaRequest>{
    return this.http.get<IArtistaRequest>(`${BASE_URL}/artistas`);
  }

    registrarArtista(artista: IArtistaRequest): Observable<IArtistaResponse> {
      console.log(artista);
      return this.http.post<IArtistaResponse>(`${BASE_URL}/artistas`, artista);
    }

}
