import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Libro, LibroPage } from '../../admin/libros/shared/libro.model';
import { enviroment } from 'src/environments/enviroment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient) { }

  getUltimosLibros(): Observable<Libro[]> {
    return this.http.get<Libro[]>(`${enviroment.apiBase}/lastLibros`);
  }
  getLibrosPaginados(page: number = 0, size: number = 6): Observable<LibroPage> {
    let params = new HttpParams();
    params = params.append('size', size);
    params = params.append('page', page);
    params = params.append('sort', 'titulo');
    return this.http.get<LibroPage>(`${enviroment.apiBase}/losDiezTitulo`, { params })
  }
  getLibroSlug(slug: string): Observable<Libro> {
    return this.http.get<Libro>(`${enviroment.apiBase}/libros/${slug}`);
  }
}
