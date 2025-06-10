export interface IEvaluacionEconomicaRequest{
    idObra: number;
    idEspecialista: number;
    precioVenta: number;
    porcentajeGanancia: number;
    fechaEvaluacion: string;
    resultado: string;
    motivoRechazo: string;
}