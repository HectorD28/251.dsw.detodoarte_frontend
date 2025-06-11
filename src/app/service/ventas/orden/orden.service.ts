import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ProductoOrden } from '../../../model/ventas/producto-orden.model';
import { OrdenPago } from '../../../model/ventas/orden-pago.model';

@Injectable({
  providedIn: 'root'
})
export class OrdenService {
  private BASE_URL: string = '';

  constructor(private http: HttpClient) {
    this.BASE_URL = environment.url;
  }

  seleccionarProducto(idProducto: number, cantidad: number): Observable<string> {
    console.log(`Seleccionando producto con ID: ${idProducto} y cantidad: ${cantidad}`);

    return this.http.post(`${this.BASE_URL}/ordenes/seleccionar?idProducto=${idProducto}&cantidad=${cantidad}`, {}, { responseType: 'text' });
  }

  cancelarProducto(idProducto: number){
    console.log(`Cancelando producto con ID: ${idProducto}`);
    return this.http.post(`${this.BASE_URL}/ordenes/cancelar/producto/${idProducto}`,{});
  }




  listarProductosSeleccionados(): Observable<ProductoOrden[]> {
    return this.http.get<ProductoOrden[]>(`${this.BASE_URL}/ordenes/productos-seleccionados`);
  }

  confirmarOrden(orden: OrdenPago): Observable<OrdenPago> {
    return this.http.post<OrdenPago>(`${this.BASE_URL}/ordenes/confirmar`, orden);
  }

  listarOrdenes(): Observable<OrdenPago[]> {
    return this.http.get<OrdenPago[]>(`${this.BASE_URL}/ordenes`);
  }

  cancelarOrden(): Observable<string> {
    return this.http.post(`${this.BASE_URL}/ordenes/cancelar`, {}, { responseType: 'text' });
  }
}
