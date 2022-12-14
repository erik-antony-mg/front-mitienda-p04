import { Component, OnInit } from '@angular/core';
import { Usuario, UsuarioPage } from '../shared/usuario.model';
import { UsuarioService } from '../shared/usuario.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-lista-usuario',
  templateUrl: './lista-usuario.component.html',
  styleUrls: ['./lista-usuario.component.css']
})
export class ListaUsuarioComponent implements OnInit {

  usuarioPage?: UsuarioPage;
  displayColumns = ['nombreCompleto', 'email', 'fechaCreacion', 'acciones']


  constructor(private usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.obtenerPaginacion();
  }

  obtenerPaginacion(sise?: number, page?: number) {
    this.usuarioService.paginarUsuario(sise, page)
      .subscribe(resp => {
        this.usuarioPage = resp;
      })
  }

  paginarUsuarios(event: PageEvent) {
    const sise = event.pageSize;
    const page = event.pageIndex;
    this.obtenerPaginacion(sise, page);
  }
  eliminarUsuario(usuario: Usuario) {
    if (!confirm('¿Estas seguro que desea  eliminar a este Usuario?')) {
      return;
    }
    this.usuarioService.eliminarUsuario(usuario.id)
      .subscribe(() => {
        this.obtenerPaginacion()
      })
  }

}
