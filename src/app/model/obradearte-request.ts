export interface IObraDeArteRequest {
  titulo: string;
  fecha_realizacion: string;
  dimensiones: string;
  id_tecnica: number;
  id_artista: number;  // Temporalmente obligatorio
  ruta_imagen: string;
  precio: number;
  cantidad_visualizaciones: number;
  stock: number;
}