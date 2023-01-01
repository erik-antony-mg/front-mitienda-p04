import { Component } from '@angular/core';
import { Libro } from 'src/app/admin/libros/shared/libro.model';
import { CarritoService } from '../shared/carrito.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent {

  constructor(
    private carritoService: CarritoService
  ) { }

  get items() {
    return this.carritoService.items;
  }
  removerItemDelCarrito(libro: Libro) {
    this.carritoService.removerItem(libro);
  }

  get total() {
    return this.items.map(i => i.precio).reduce((acumulador, precio) => acumulador + precio, 0);
  }

  pagar() {

  }
}

