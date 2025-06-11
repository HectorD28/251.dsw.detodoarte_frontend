import { IExposicionVirtualResponse } from "./exposicion-virtual-response";
import { IObraDeArteResponse } from "./obradearte-response";

export interface IExposicionVirtualObraResponse{
    idExposicionVirtualObra: number;
    exposicionVirtual: IExposicionVirtualResponse;
    idObra: IObraDeArteResponse;
}