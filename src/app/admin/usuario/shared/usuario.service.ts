import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario, UsuarioPage } from './usuario.model';
import { enviroment } from 'src/environments/enviroment';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }

  paginarUsuario(size: number = 5, page: number = 0): Observable<UsuarioPage> {
    let params = new HttpParams();
    params = params.append('size', size);
    params = params.append('page', page);
    params = params.append('sort', 'fechaCreacion,desc');
    return this.http.get<UsuarioPage>(`${enviroment.apiBase}/admin/usuarios`, { params })
  }

  listarUsuario(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${enviroment.apiBase}/admin/usuarios/listar`)
  }

  nuevoUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(`${enviroment.apiBase}/admin/usuarios`, usuario)
  }

  eliminarUsuario(id: number): Observable<any> {
    return this.http.delete<any>(`${enviroment.apiBase}/admin/usuarios/${id}`)
  }
  obtenerUsuarioById(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${enviroment.apiBase}/admin/usuarios/${id}`)
  }
  actualizarUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(`${enviroment.apiBase}/admin/usuarios/${usuario.id}`, usuario)
  }

}
