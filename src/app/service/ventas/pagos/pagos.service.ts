import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OrdenPago } from '../../../model/ventas/orden-pago.model';
import { TokenService } from '../../../JWT/token.service';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PagosService {
  private BASE_URL: string = '';

  constructor(
    private http: HttpClient,
    private tokenService: TokenService,
  ) {
    this.BASE_URL = environment.url;
  }

  getListaPagosPendientes() {
    return this.http.get<OrdenPago>(`${this.BASE_URL}/api/ordenes/pendientes`);
  }

  postConfirmar(idCliente: number){
    return this.http.post<any>(`${this.BASE_URL}/carrito/confirmar/${idCliente}`, {});
  }

  postSeleccionar(idOrden: number): Observable<string> {
    return this.http.post(`${this.BASE_URL}/carrito/agregar/${idOrden}`, {}, { responseType: 'text' });
  }
  postAgregarConsulta(precioConsulta: number){
    return this.http.post<number>(`${this.BASE_URL}/carrito/agregar-consulta/${precioConsulta}`,{},  );
  }
  getListaCarrito(){
    return this.http.get<any>(`${this.BASE_URL}/carrito/listar`);
  }
  deleteSeleccionar(){
    return this.http.delete(`${this.BASE_URL}/carrito/vaciar`,{responseType: 'text'});
  }
  deleteConsulta(pagoId: number){
    return this.http.delete(`${this.BASE_URL}/carrito/quitar-consulta/${pagoId}`);
  }
  cancelarOrdenPago(){

  }
  validarDNI(dni: string){
    return this.http.get<number>(`${this.BASE_URL}/api/pagos/validar-documento/${dni}`);
  }
  expirarOrdenPago(idOrden: number){
    return this.http.post(`${this.BASE_URL}/api/ordenes/expirar/${idOrden}`,{},{responseType: 'text'});
  }
}
