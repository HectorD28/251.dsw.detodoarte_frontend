export interface IObraDeArteRequest {
  titulo: string;
  fecha_realizacion: string;
  dimensiones: string;
  id_tecnica: number;
  id_artista: number;  // Temporalmente obligatorio
  precio: number;      // También puede ser opcional si lo asigna especialista
  ruta_imagen: string;
  cantidad_visualizaciones: number;
  stock: number;
}