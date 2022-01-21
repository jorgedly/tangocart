import { Component, OnInit } from '@angular/core';
import { Producto, Pedido } from 'src/app/Estructura';
import { ClientesService } from 'src/app/services/clientes.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {

  carritoVacio = false;
  arregloCarrito: any[] = [];
  pedido: any = {
    idUser: '',
    nombre: '',
    nit: 0,
    products: [],
    cliente: {},
    fecha: this.getFecha(),
    estado: "solicitado",
    total: 0
  };
  user : any = {};
  fecha : any ="";

  constructor(private servicio: ClientesService) { 
    var guardado = JSON.parse(localStorage.getItem('carrito'));
    if(guardado != null){
      this.arregloCarrito = guardado;
      console.log(this.arregloCarrito)
      this.pedido.products = this.arregloCarrito;
      for(let i = 0; i < this.arregloCarrito.length; i++){
        this.pedido.total = this.pedido.total + (Number((this.arregloCarrito[i].precio) * Number(this.arregloCarrito[i].cantidad)));
      }
      this.carritoVacio = true;
    }
    console.log(this.pedido)
  }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('usuario'));
    this.pedido.cliente = this.user;
    this.fecha = this.getFecha();
    this.pedido.idUser = this.user.id;
    this.pedido.nombre = this.user.nombre;
  }

  comprar(){
    this.pedido.products = this.arregloCarrito;
    this.pedido.fecha= this.getFecha();
    this.servicio.createOrder(this.pedido,this.user.token).subscribe(data => {
      localStorage.removeItem('carrito');
      this.arregloCarrito = [];
      this.pedido = {
        idUser: this.user.id,
        nombre: this.user.nombre,
        nit: 0,
        products: [],
        cliente: {},
        fecha: this.getFecha(),
        estado: "solicitado",
        total: 0
      };
      this.carritoVacio = false;
      alert('Se ha realizado el pedido correctamente');
    }, error => {
      alert('Ha existido un error al realizar el pedido');
    });
  }

  actualizarCantidad(index){
    let lineItem = <HTMLInputElement>document.querySelector('#quantity-'+index);
    this.arregloCarrito[index].cantidad = Number(lineItem.value)
    localStorage.setItem('carrito', JSON.stringify(this.arregloCarrito))
    this.pedido.total = 0;
    for(let i = 0; i < this.arregloCarrito.length; i++){
      this.pedido.total = this.pedido.total + (this.arregloCarrito[i].precio * this.arregloCarrito[i].cantidad);
    }
    this.carritoVacio = true;
  }

  limpiarCarrito(){
    localStorage.removeItem('carrito');
    this.arregloCarrito = [];
    this.carritoVacio = false;
    this.pedido = {
      idUser: this.user.id,
      nombre: this.user.nombre,
      nit: 0,
      products: [],
      cliente: {},
      fecha: this.getFecha(),
      estado: "solicitado",
      total: 0
    };
  }

  getFecha(){
    const targetTime = new Date();
    let timeZoneFromDB = -6.00; //time zone value from database
    //get the timezone offset from local time in minutes
    let tzDifference = timeZoneFromDB * 60 + targetTime.getTimezoneOffset();
    //convert the offset to milliseconds, add to targetTime, and make a new Date
    const date = new Date(targetTime.getTime() + tzDifference * 60 * 1000);
    let fecha = `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;

    return fecha;    
  }
}
