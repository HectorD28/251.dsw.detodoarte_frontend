<<<<<<< HEAD
import { IPersonaResponse } from'./persona-response'

export interface IArtistaResponse {
    idArtista: number; // Mapeado como id_artista en la base de datos
    personaId: IPersonaResponse; // mapeado a persona_id en la base de datos
=======
import { IPersonaResponse } from './persona-response';
export interface IArtistaResponse {
    idArtista: number; // Mapeado como id_artista en la base de datos
    persona: IPersonaResponse; // mapeado a persona_id en la base de datos
>>>>>>> 64b91b739cd115b9f6f5c4c07c042aaf7993ef49
}