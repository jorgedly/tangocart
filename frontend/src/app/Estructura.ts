export interface Genero {
    _id?: string;
    nombre: string;
    descripcion: string; 
    seleccionado?: boolean;
}

export interface Producto {
    _id?: string;
    imagen: string;
    nombre: string;
    precio: number;
    cantidad: number;
    generos: Genero[];
    proveedor?: any;
}
export interface Producto2 {
    _id?: string;
    imagen: string;
    nombre: string;
    precio: number;
    cantidad: number;
    generos: Genero[];
    username: string;
    timepoFinSubasta: string;
    usernameComprador: string;
    proveedor?: any;
}
 
export interface ProductoPedido {
    _id?: string;
    cantidad: number;
}

export interface Pedido {
    _id?: string;
    direccion: string;
    departamento: string;
    codigoPostal: number;
    numeroTarjeta: string;
    fechaVencimiento: string;
    ccv: number;
    total: number;
    productos: ProductoPedido[];
    cliente?: any,
    fecha?: string,
    estado?: string
}

export interface Usuario {
    _id?: string;
    nickname: string;
    pass: string;
    nombreCompleto: string;
    telefono: number;
    correo: string;
    tipoUsuario: string;
    validado: boolean;
    activo: boolean;
    validadoPor: number;
}

export interface pedirUsuario {
    nickname: string;
    _id: string;
}

export interface username {
    username: string;
}