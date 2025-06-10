import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cantidadProductosSubject = new BehaviorSubject<number>(0); // Usamos un BehaviorSubject para almacenar y emitir la cantidad de productos
  cantidadProductos$ = this.cantidadProductosSubject.asObservable();

  constructor() {}

   actualizarCantidadProductos(cantidad: number): void {
    this.cantidadProductosSubject.next(cantidad);
  }

  // Retorna la cantidad de productos
  obtenerCantidadProductos(): number {
    return this.cantidadProductosSubject.getValue();
  }
  
}