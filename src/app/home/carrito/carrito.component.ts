import { Component, OnInit } from '@angular/core';
import { Libro } from 'src/app/admin/libros/shared/libro.model';
import { CarritoService } from '../shared/carrito.service';
import { HomeService } from '../shared/home.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {

  loading = false;

  constructor(
    private carritoService: CarritoService,
    private homeService: HomeService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const token = this.route.snapshot.queryParamMap.get('token');
    if (token) {
      this.loading = true;
      this.homeService.capturarPagoPaypal(token)
        .subscribe(resp => {
          if (resp.completado) {
            this.carritoService.removerItems();
            this.router.navigate(['detalles-venta', resp.idVenta])
          }
        })
    }
  }

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
    const idLibros = this.items.map(item => item.id);

    this.loading = true;

    this.homeService.crearPagoPaypal(idLibros)
      .subscribe(resp => {
        window.location = resp.approveUrl;
      })
  }
}

