import { Component, OnInit } from '@angular/core';
import { Libro } from 'src/app/admin/libros/shared/libro.model';
import { HomeService } from '../shared/home.service';


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  ultimosLibros: Libro[] = [];
  constructor(private homeService: HomeService) { }


  ngOnInit(): void {
    this.homeService.getUltimosLibros()
      .subscribe(resp => {
        this.ultimosLibros = resp;
      })
  }


}
