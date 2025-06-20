import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { NAVBAR_ITEMS } from './../../constants/navbar-items';

@Injectable({
  providedIn: 'root',
})
export class NavbarService {
  private _items: any[] = [];
  private readonly itemsKey = 'navbarItems';

  constructor(@Inject(PLATFORM_ID) private platformId: object) {
    //Recupera las opciones 'items' del localStorage
    if (isPlatformBrowser(this.platformId)) {
      const storedItems = localStorage.getItem(this.itemsKey);
      if (storedItems) {
        this._items = JSON.parse(storedItems);
      }
    }
  }

  //Metodo para obtener las opciones 'items'
  get items(): any[] {
    return this._items;
  }

  //Metodo para establecer las opciones 'items' según el rol
  setItems(role: string): void {
    role = role.toLowerCase();
    this._items = NAVBAR_ITEMS[role] || [];
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.itemsKey, JSON.stringify(this._items));
    }
  }

  //Metodo para limpiar las opciones 'items'
  clearItems(): void {
    this._items = [];
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(this.itemsKey);
    }
  }
}
