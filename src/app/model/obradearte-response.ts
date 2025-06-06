import { IArtistaResponse } from './artista-response';
import { ITecnicaResponse } from './tecnica-response';

export interface IObraDeArteResponse {
  obraId: number;
  titulo: string;
  fechaRealizacion: string;
  dimensiones: string;
  tecnicaId: ITecnicaResponse;    // objeto completo técnica
  artistaId: IArtistaResponse;    // objeto completo artista
  precio: number;
  cantidadVisualizaciones: number;
  rutaImagen: string;
  stock: number;
}