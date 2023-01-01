import { Component, OnInit } from '@angular/core';
import { Libro } from 'src/app/admin/libros/shared/libro.model';
import { HomeService } from '../shared/home.service';

@Component({
  selector: 'app-libros',
  templateUrl: './libros.component.html',
  styleUrls: ['./libros.component.css']
})
export class LibrosComponent implements OnInit {
  libros: Libro[] = [];
  page = 0;

  constructor(
    private homeservice: HomeService
  ) { }

  ngOnInit(): void {
    this.homeservice.getLibrosPaginados()
      .subscribe(resp => {
        this.libros = resp.content;
        this.page = resp.number;
      })
  }



  cargarMasLibros() {
    this.page++;
    this.homeservice.getLibrosPaginados(this.page)
      .subscribe(resp => {
        this.libros.push(...resp.content);
        this.page = resp.number;
      })
  }
}
