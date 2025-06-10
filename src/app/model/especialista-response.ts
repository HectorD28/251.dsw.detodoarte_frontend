import { IEspecialistaRequest } from'./especialista-request'
import { ITecnicaResponse } from './tecnica-response';
export interface IEspecialistaResponse {
    idEspecialista: number; // Mapeado como id_artista en la base de datos
    persona: IEspecialistaRequest; // mapeado a persona_id en la base de datos
    tecnica: ITecnicaResponse
}