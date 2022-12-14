import { Component, OnInit } from '@angular/core';
import { LibroService } from '../shared/libro.service';
import { Libro, LibroPage } from '../shared/libro.model';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-lista-libros',
  templateUrl: './lista-libros.component.html',
  styleUrls: ['./lista-libros.component.css']
})
export class ListaLibrosComponent implements OnInit {


  libroPage?: LibroPage;
  displayColumns = ['titulo', 'precio', 'fechaCreacion', 'acciones']
  constructor(private libroService: LibroService) { }

  ngOnInit(): void {
    this.obtenerPaginacion();
  }

  obtenerPaginacion(sise?: number, page?: number) {
    this.libroService.paginarLibro(sise, page)
      .subscribe(resp => {
        this.libroPage = resp;
      })
  }

  paginarLibros(event: PageEvent) {

    const sise = event.pageSize;
    const page = event.pageIndex;
    this.obtenerPaginacion(sise, page);

  }

  eliminarLibro(libro: Libro) {

    if (!confirm('¿Estas seguro de eliminar este libro?')) {
      return;
    }

    this.libroService.eliminarLibro(libro.id)
      .subscribe(() => {
        this.obtenerPaginacion()
      })
  }
}
