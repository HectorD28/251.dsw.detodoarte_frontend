import { IPersonaRequest } from'./persona-request'
export interface IArtistaResponse {
    id_artista: number; // Mapeado como id_artista en la base de datos
    persona_id: IPersonaRequest; // mapeado a persona_id en la base de datos
}