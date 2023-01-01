import { Component } from '@angular/core';
import { CarritoService } from '../shared/carrito.service';

@Component({
  selector: 'app-home-layout',
  templateUrl: './home-layout.component.html',
  styleUrls: ['./home-layout.component.css']
})
export class HomeLayoutComponent {

  constructor(private carritoService: CarritoService) {

  }

  get items() {
    return this.carritoService.items;
  }

}
