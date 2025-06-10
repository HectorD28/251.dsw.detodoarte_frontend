import { IPersonaResponse } from './persona-response';
export interface IArtistaResponse {
    idArtista: number; // Mapeado como id_artista en la base de datos
    persona: IPersonaResponse; // mapeado a persona_id en la base de datos
}