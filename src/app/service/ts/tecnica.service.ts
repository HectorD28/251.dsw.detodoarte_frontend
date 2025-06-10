import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BASE_URL } from '../../utils/constants';
import { ITecnicaRequest } from '../../model/tecnica-request';
import { ITecnicaResponse } from '../../model/tecnica-response';

@Injectable({
  providedIn: 'root'
})
export class TecnicaService {
  private readonly API = `${BASE_URL}/tecnicas`;

  constructor(private http: HttpClient) {}

  obtenerTodas(): Observable<ITecnicaResponse[]> {
    return this.http.get<ITecnicaResponse[]>(this.API+`/obtener`);
  }

  registrarTecnica(tecnica: ITecnicaRequest): Observable<ITecnicaResponse> {
    return this.http.post<ITecnicaResponse>(this.API, tecnica);
  }
}
