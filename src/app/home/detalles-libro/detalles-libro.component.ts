import { Component, OnInit } from '@angular/core';
import { Libro } from 'src/app/admin/libros/shared/libro.model';
import { CarritoService } from '../shared/carrito.service';
import { HomeService } from '../shared/home.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detalles-libro',
  templateUrl: './detalles-libro.component.html',
  styleUrls: ['./detalles-libro.component.css']
})
export class DetallesLibroComponent implements OnInit {

  libro?: Libro;

  constructor(
    private carritoService: CarritoService,
    private homeService: HomeService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug')!;
    this.homeService.getLibroSlug(slug)
      .subscribe(resp => {
        this.libro = resp;
      })
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
