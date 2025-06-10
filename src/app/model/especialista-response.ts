<<<<<<< HEAD
import { IPersonaResponse } from "./persona-response";
import { ITecnicaResponse } from "./tecnica-response";

export interface IEspecialistaResponse {
  idEspecialista: number;
  persona: IPersonaResponse;
  tecnica: ITecnicaResponse;
=======
import { IEspecialistaRequest } from'./especialista-request'
import { ITecnicaResponse } from './tecnica-response';
export interface IEspecialistaResponse {
    idEspecialista: number; // Mapeado como id_artista en la base de datos
    persona: IEspecialistaRequest; // mapeado a persona_id en la base de datos
    tecnica: ITecnicaResponse
>>>>>>> 64b91b739cd115b9f6f5c4c07c042aaf7993ef49
}