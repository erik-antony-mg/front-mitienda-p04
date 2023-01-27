import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeLayoutComponent } from './home-layout/home-layout.component';
import { IndexComponent } from './index/index.component';
import { MaterialModule } from '../material/material.module';
import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from '../shared/shared.module';
import { LibrosComponent } from './libros/libros.component';
import { InfiniteScrollModule } from "ngx-infinite-scroll";
import { TarjetaLibroComponent } from './shared/tarjeta-libro/tarjeta-libro.component';
import { DetallesLibroComponent } from './detalles-libro/detalles-libro.component';
import { CarritoComponent } from './carrito/carrito.component';
import { DetallesVentaComponent } from './detalles-venta/detalles-venta.component';



@NgModule({
  declarations: [
    HomeLayoutComponent,
    IndexComponent,
    LibrosComponent,
    TarjetaLibroComponent,
    DetallesLibroComponent,
    CarritoComponent,
    DetallesVentaComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MaterialModule,
    SharedModule,
    InfiniteScrollModule
  ]
})
export class HomeModule { }
