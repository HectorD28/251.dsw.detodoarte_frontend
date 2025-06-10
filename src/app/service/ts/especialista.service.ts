import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IEspecialistaRequest } from '../model/especialista-request';
import { IEspecialistaResponse } from '../model/especialista-response';
import { BASE_URL } from '../utils/constants';
@Injectable({
  providedIn: 'root'
})
export class EspecialistaService {

  constructor(private http: HttpClient) { }


    obtenerTodosEspecialistas(): Observable<IEspecialistaResponse[]> {
      return this.http.get<IEspecialistaResponse[]>(`${BASE_URL}/especialistas/obtener`);
    }

    registrarEspecialista(especialista: IEspecialistaRequest): Observable<IEspecialistaResponse> {
      console.log(especialista);
      return this.http.post<IEspecialistaResponse>(`${BASE_URL}/especialistas/crear`, especialista);
    }
    
    deleteEspecialista(id: number) {
      return this.http.delete(`${BASE_URL}/especialistas/${id}`);
    }
  
    //metodo para obtener cliente por id
    getEspecialista(id: number) {
      return this.http.get<IEspecialistaResponse>(`${BASE_URL}/especialistas/${id}`);
    }
  
      //metodo para modificar cliente
    updateEspecialista(especialista: IEspecialistaRequest, id: number) {
      return this.http.put(`${BASE_URL}/especialistas/edit/${id}`, especialista);
    }


}
