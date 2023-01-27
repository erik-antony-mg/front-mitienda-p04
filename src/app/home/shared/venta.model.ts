import { Libro } from "src/app/admin/libros/shared/libro.model";

export interface Venta {
  id: number;
  fecha: Date;
  total: number;
  estado: string;
  usuario: Usuario;
  items: Item[];
}

export interface Item {
  id: number;
  precio: number;
  numeroDescargasDisponibles: number;
  libro: Libro;
}

export interface Usuario {
  id: number;
  nombres: string;
  apellidos: string;
  nombreCompleto: string;
  email: string;
  password: string;
  rol: string;
  fechaCreacion: Date;
  fechaActualizacion: null;
}
