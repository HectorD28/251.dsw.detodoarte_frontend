import { IPersonaResponse } from "./persona-response";

export interface IAdministradorResponse{
    idAministrador: number;
    personaId: IPersonaResponse;
    password: string;
    tipoUsuario: string;
}