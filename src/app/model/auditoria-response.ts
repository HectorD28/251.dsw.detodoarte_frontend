import { IPersonaResponse } from "./persona-response";

export interface IAuditoriaResponse{
    idAuditoria: number;
    tablaModificada: string;
    idRegistroModificado: number;
    campoModificado: string;
    valorAnterior: string;
    valorNuevo: string;
    fechaModificacion: string;
    personaId: IPersonaResponse;
}