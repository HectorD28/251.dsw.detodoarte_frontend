import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPersonaResponse } from '../../model/persona-response';
import { BASE_URL } from '../../utils/constants';
import { Observable } from 'rxjs';
import { IPersonaRequest } from '../../model/persona-request';
import { IArtistaRequest } from '../../model/artista-request';
import { IArtistaResponse } from '../../model/artista-response';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  constructor(private http: HttpClient) { }

  obtenerTodasPersonas(): Observable<IPersonaResponse[]> {
    return this.http.get<IPersonaResponse[]>(`${BASE_URL}/personas`);
  }

  detallePersonas(): Observable<IPersonaResponse[]> {
    return this.http.get<IPersonaResponse[]>(`${BASE_URL}/personas/details`);
  }

  registrarPersona(persona: IPersonaRequest): Observable<IPersonaResponse> {
    console.log(persona);
    return this.http.post<IPersonaResponse>(`${BASE_URL}/personas/register`, persona);
  }
  
  deleteCliente(id: number) {
    return this.http.delete(`${BASE_URL}/personas/${id}`);
  }

  //metodo para obtener cliente por id
  getCliente(id: number) {
    return this.http.get<IPersonaResponse>(`${BASE_URL}/personas/${id}`);
  }

    //metodo para modificar cliente
  updateCliente(cliente: IPersonaRequest, id: number) {
    return this.http.put(`${BASE_URL}/personas/edit/${id}`, cliente);
  }

}
