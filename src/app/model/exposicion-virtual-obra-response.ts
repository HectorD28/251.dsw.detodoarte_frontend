import { IExposicionVirtualResponse } from "./exposicion-virtual-response";
import { IObraDeArteResponse } from "./obradearte-response";

export interface IExposicionVirtualObraRequest{
    idExposicionVirtualObra: number;
    exposicionVirtual: IExposicionVirtualResponse;
    idObra: IObraDeArteResponse;
}