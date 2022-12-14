import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaLibrosComponent } from './libros/lista-libros/lista-libros.component';
import { FormLibroComponent } from './libros/form-libro/form-libro.component';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { ListaUsuarioComponent } from './usuario/lista-usuario/lista-usuario.component';
import { FormUsuarioComponent } from './usuario/form-usuario/form-usuario.component';

const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
        path: 'libros',
        component: ListaLibrosComponent
      },
      {
        path: 'libros/nuevo',
        component: FormLibroComponent
      },
      {
        path: 'libros/editar/:id',
        component: FormLibroComponent
      },
      {
        path: 'usuarios',
        component: ListaUsuarioComponent
      },
      {
        path: 'usuarios/nuevo',
        component: FormUsuarioComponent
      },
      {
        path: 'usuarios/editar/:id',
        component: FormUsuarioComponent
      }
    ]
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
