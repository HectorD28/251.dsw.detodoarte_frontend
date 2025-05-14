import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPersonaResponse } from '../model/persona-response';
import { BASE_URL } from '../utils/constants';
import { Observable } from 'rxjs';
import { IPersonaRequest } from '../model/persona-request';
import { IArtistaRequest } from '../model/artista-request';
import { IArtistaResponse } from '../model/artista-response';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  constructor(private http: HttpClient) { }
  obtenerTodasPersonas(): Observable<IPersonaResponse> {
    return this.http.get<IPersonaResponse>(`${BASE_URL}/personas`);
  }

  registrarPersona(persona: IPersonaRequest): Observable<IPersonaResponse> {
    console.log(persona);
    return this.http.post<IPersonaResponse>(`${BASE_URL}/personas`, persona);
  }
  
  eliminarPersona(persona: IPersonaRequest): Observable<IPersonaResponse> {
    return this.http.delete<IPersonaResponse>(`${BASE_URL}/personas`, {
      body: persona,
    });
  }

  actualizarPersona(persona: IPersonaRequest): Observable<IPersonaResponse> {
    return this.http.put<IPersonaResponse>(`${BASE_URL}/personas`, persona);
  }




  obtenerTodasArtistas(): Observable<IArtistaResponse> {
    return this.http.get<IArtistaResponse>(`${BASE_URL}/artistas`);
  }

  registrarArtista(artista: IArtistaRequest): Observable<IArtistaResponse> {
    console.log(artista);
    return this.http.post<IArtistaResponse>(`${BASE_URL}/artistas`, artista);
  }
  
  eliminarArtista(artista: IArtistaRequest): Observable<IArtistaResponse> {
    return this.http.delete<IArtistaResponse>(`${BASE_URL}/artistas`, {
      body: artista,
    });
  }

  actualizarArtista(artista: IArtistaRequest): Observable<IArtistaResponse> {
    return this.http.put<IArtistaResponse>(`${BASE_URL}/artistas`, artista);
  }



}
