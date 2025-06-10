import { IPersonaResponse } from "./persona-response";
import { ITecnicaResponse } from "./tecnica-response";

export interface IEspecialistaResponse {
  idEspecialista: number;
  persona: IPersonaResponse;
  tecnica: ITecnicaResponse;
}