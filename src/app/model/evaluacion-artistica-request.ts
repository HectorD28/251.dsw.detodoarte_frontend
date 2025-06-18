export interface IEvaluacionArtisticaRequest{
    idObra: number;
    idEspecialista: number;
    fechaEvaluacion: string;
    resultado: string;
    motivoRechazo: string;
    puntajefinal: number;
}