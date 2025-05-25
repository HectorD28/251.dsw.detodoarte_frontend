import { IPersonaRequest } from'./persona-request'
export interface IArtistaResponse {
    idArtista: number; // Mapeado como id_artista en la base de datos
    persona: IPersonaRequest; // mapeado a persona_id en la base de datos
}