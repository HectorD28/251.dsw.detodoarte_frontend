import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IExposicionRequest } from '../model/exposicion-request';
import { IExposicionResponse } from '../model/exposicion-response';
import { BASE_URL } from '../utils/constants';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProgramarExposicionService {
  constructor(private http: HttpClient) {}

  programarExposicion(data: IExposicionRequest) {
  return this.http.post<IExposicionResponse>(`${BASE_URL}/exposiciones/programar`, data);  }

  obtenerExposicionesProgramadas(): Observable<IExposicionResponse[]> {
    return this.http.get<IExposicionResponse[]>(`${BASE_URL}/exposiciones/todas`);
  }
}