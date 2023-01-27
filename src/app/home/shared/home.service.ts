import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Libro, LibroPage } from '../../admin/libros/shared/libro.model';
import { enviroment } from 'src/environments/enviroment';
import { Observable } from 'rxjs';
import { Venta } from '../../home/shared/venta.model';

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

  crearPagoPaypal(idLibros: number[]): Observable<any> {
    const urlRetorno = 'http://localhost:4200/carrito'
    return this.http.post<any>(`${enviroment.apiBase}/pago/paypal/crear?urlRetorno=${urlRetorno}`, idLibros);
  }

  capturarPagoPaypal(token: string): Observable<any> {

    return this.http.post<any>(`${enviroment.apiBase}/pago/paypal/capturar?token=${token}`, null);
  }

  getVenta(idVenta: number): Observable<Venta> {
    return this.http.get<Venta>(`${enviroment.apiBase}/ventas/${idVenta}`);
  }

  descargarArchivoItemVenta(idVenta: number, idItemVenta: number) {
    return this.http.get(`${enviroment.apiBase}/ventas/${idVenta}/items/${idItemVenta}/archivo/descargar`, {
      responseType: 'blob'
    })
  }
}
