export interface LibroPage {
  content: Libro[];
  pageable: Pageable;
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  sort: Sort;
  first: boolean;
  numberOfElements: number;
  empty: boolean;
}

export interface Libro {
  id: number;
  titulo: string;
  slug: null | string;
  descripcion: null | string;
  rutaPortada: null | string;
  rutaArchivo: null | string;
  precio: number;
  fechaCreacion: Date;
  fechaActualizacion: Date | null;
}

export interface Pageable {
  sort: Sort;
  offset: number;
  pageNumber: number;
  pageSize: number;
  paged: boolean;
  unpaged: boolean;
}

export interface Sort {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}
