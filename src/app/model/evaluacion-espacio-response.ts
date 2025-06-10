import { IEspacioGaleriaResponse } from "./espacio-galeria-response";
import { IObraDeArteResponse } from "./obradearte-response";
import { IAdministradorResponse } from "./administrador-response";

export interface IEvaluacionEspacioRequest{
    idEvaluacionEspacio: number;
    idObra: IObraDeArteResponse;
    idEspacio: IEspacioGaleriaResponse;
    idAdministrador: IAdministradorResponse;
    resultado: string;
    comentarios: string;
}