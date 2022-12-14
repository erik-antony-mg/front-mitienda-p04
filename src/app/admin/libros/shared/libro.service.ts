import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Libro, LibroPage } from './libro.model';
import { Observable } from 'rxjs';
import { enviroment } from 'src/environments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class LibroService {

  constructor(private http: HttpClient) { }

  paginarLibro(size: number = 5, page: number = 0): Observable<LibroPage> {
    let params = new HttpParams();
    params = params.append('size', size);
    params = params.append('page', page);
    params = params.append('sort', 'fechaCreacion,desc');
    return this.http.get<LibroPage>(`${enviroment.apiBase}/admin/libros`, { params })
  }

  listar(): Observable<Libro[]> {
    return this.http.get<Libro[]>(`${enviroment.apiBase}/admin/libros/listar`)
  }

  nuevoLibro(libro: Libro): Observable<Libro> {
    return this.http.post<Libro>(`${enviroment.apiBase}/admin/libros`, libro)
  }

  actualizarLibro(libro: Libro): Observable<Libro> {
    return this.http.put<Libro>(`${enviroment.apiBase}/admin/libros/${libro.id}`, libro)
  }
  //alt +96
  obtenerLibroById(id: number): Observable<Libro> {
    return this.http.get<Libro>(`${enviroment.apiBase}/admin/libros/${id}`)
  }

  eliminarLibro(id: number): Observable<any> {
    return this.http.delete<any>(`${enviroment.apiBase}/admin/libros/${id}`)
  }

  subirArchivo(formData: FormData): Observable<any> {
    return this.http.post(`${enviroment.apiBase}/media/upload`, formData)
  }
}
