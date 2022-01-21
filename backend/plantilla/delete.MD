


Pedidos estructura
	{
		direccion: "",
		departamento: "",
		codigo postal: "",
		numero de tarjeta: "",
		fecha vencimiento: "",
		ccv: "",
		total: "",
		productos: [
			{
				id: "",
				cantidad: ""
			}
		]
	}
	
	
	metodos: 
		- get cantidad mayor 0
		- post  


export interface ProductoPedido {
    id?: string;
    cantidad: number;
}

export interface Pedido {
    id?: string;
    direccion: string;
    departamento: string;
    codigoPostal: number;
    numeroTarjeta: string;
    fechaVencimiento: string;
    ccv: number;
    total: number;
    productos: ProductoPedido[];
}
