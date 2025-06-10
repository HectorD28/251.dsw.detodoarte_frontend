import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ITecnicaRequest } from '../../model/tecnica-request';  // Modelo de Request
import { ITecnicaResponse } from '../../model/tecnica-response';  // Modelo de Response
import { BASE_URL } from '../../utils/constants';  // Importamos BASE_URL desde el archivo utils/constants.ts

@Injectable({
  providedIn: 'root'
})
export class TecnicaService {

  constructor(private http: HttpClient) { }

  // Método para obtener todas las técnicas
  obtenerTodasTecnicas(): Observable<ITecnicaResponse[]> {
    return this.http.get<ITecnicaResponse[]>(`${BASE_URL}/tecnicas/obtener`);
  }

  // Método para obtener una técnica por ID
  obtenerTecnicaPorId(id: number): Observable<ITecnicaResponse> {
    return this.http.get<ITecnicaResponse>(`${BASE_URL}/tecnicas/${id}`);
  }

  // Método para crear una nueva técnica
  crearTecnica(tecnica: ITecnicaRequest): Observable<ITecnicaResponse> {
    return this.http.post<ITecnicaResponse>(`${BASE_URL}/tecnicas/crear`, tecnica);
  }

  // Método para actualizar una técnica
  actualizarTecnica(id: number, tecnica: ITecnicaRequest): Observable<ITecnicaResponse> {
    return this.http.put<ITecnicaResponse>(`${BASE_URL}/tecnicas/${id}`, tecnica);
  }

  // Método para eliminar una técnica
  eliminarTecnica(id: number): Observable<void> {
    return this.http.delete<void>(`${BASE_URL}/tecnicas/${id}`);
  }
}
