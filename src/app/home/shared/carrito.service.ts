import { Injectable } from '@angular/core';
import { Libro } from 'src/app/admin/libros/shared/libro.model';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private key = 'miTiendaWeb';
  private _items: Libro[] = [];

  constructor() {
    const carrito = localStorage.getItem(this.key);
    this._items = carrito ? JSON.parse(carrito) : [];
  }

  get items() {
    return this._items;
  }

  agregarItem(libro: Libro) {
    this._items.push(libro);
    this.guardarLocalStorage();
  }

  removerItem(libro: Libro) {
    this._items = this._items.filter(i => i.id != libro.id);
    this.guardarLocalStorage();
  }

  removerItems() {
    this._items = [];
    this.guardarLocalStorage();
  }

  itemYaExiste(libro: Libro) {
    return this._items.findIndex(i => i.id == libro.id) >= 0;
  }

  guardarLocalStorage() {
    localStorage.setItem(this.key, JSON.stringify(this._items))
  }
}
