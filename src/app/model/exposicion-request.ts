export interface IExposicionRequest {
  nombre: string;
  descripcion: string;
  fecha_inicio: string; // Usa string si envías fechas como 'YYYY-MM-DD'
  fecha_fin: string;
  tipo_exposicion: string;
  idSolicitudExposicion: number;
}