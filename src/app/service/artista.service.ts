import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IArtistaRequest } from '../model/artista-request';
import { IArtistaResponse } from '../model/artista-response';
import { BASE_URL } from '../utils/constants';

@Injectable({
  providedIn: 'root'
})
export class ArtistaService {

  constructor(private http: HttpClient) { }

    // Cambié el nombre a obtenerTodas para indicar que trae todas las artistas
    obtenerTodasArtistas(): Observable<IArtistaResponse[]> {
      return this.http.get<IArtistaResponse[]>(`${BASE_URL}/artistas/obtener`);
    }

    registrarArtista(artista: IArtistaRequest): Observable<IArtistaResponse> {
      console.log(artista);
      return this.http.post<IArtistaResponse>(`${BASE_URL}/artistas/crear`, artista);
    }
    
    deleteArtista(id: number) {
      return this.http.delete(`${BASE_URL}/artistas/${id}`);
    }
  
    //metodo para obtener cliente por id
    getArtista(id: number) {
      return this.http.get<IArtistaResponse>(`${BASE_URL}/artistas/${id}`);
    }
  
      //metodo para modificar cliente
    updateArtista(artista: IArtistaRequest, id: number) {
      return this.http.put(`${BASE_URL}/artistas/edit/${id}`, artista);
    }


    

}
