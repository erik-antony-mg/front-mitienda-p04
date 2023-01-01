import { Component, Input } from '@angular/core';
import { Libro } from 'src/app/admin/libros/shared/libro.model';
import { CarritoService } from '../carrito.service';

@Component({
  selector: 'app-tarjeta-libro',
  templateUrl: './tarjeta-libro.component.html',
  styleUrls: ['./tarjeta-libro.component.css']
})
export class TarjetaLibroComponent {

  @Input()
  libro!: Libro

  constructor(private carritoService: CarritoService) {

  }

  agregarAlCarrito(libro: Libro) {
    this.carritoService.agregarItem(libro);
  }

  removerItemDelCarrito(libro: Libro) {
    this.carritoService.removerItem(libro);
  }

  existeItemEnElCarrito(libro: Libro) {
    return this.carritoService.itemYaExiste(libro);
  }
}
