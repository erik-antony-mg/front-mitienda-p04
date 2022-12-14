
export interface UsuarioPage {
    content: Usuario[];
    pageable: Pageable;
    last: boolean;
    totalPages: number;
    totalElements: number;
    size: number;
    number: number;
    sort: Sort;
    numberOfElements: number;
    first: boolean;
    empty: boolean;
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

export interface Pageable {
    sort: Sort;
    offset: number;
    pageSize: number;
    pageNumber: number;
    paged: boolean;
    unpaged: boolean;
}

export interface Sort {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
}
