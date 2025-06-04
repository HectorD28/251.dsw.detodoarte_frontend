export interface IExposicionResponse {
  id_exposicion: number;
  nombre: string;
  descripcion: string;
  fecha_inicio: string; // O Date si lo conviertes después de recibirlo
  fecha_fin: string;
  tipo_exposicion: string;
}