import { Component, OnInit } from '@angular/core';
import { ClientesService } from '../../services/clientes.service';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit {

  constructor(private servicio: ClientesService) { }


  pedidos: any;
  user: any = {};

  ngOnInit(): void {
    this.getPedidos();
    this.user = JSON.parse(localStorage.getItem('usuario'));
  }

  getPedidos() {
    this.servicio.getPedidos().subscribe(data => {
      console.log(data)
      if (this.user.rol == '2') {
        console.log('Entra cliente')
        this.pedidos = data;
      } else if (this.user.rol == '3') {
        this.pedidos = data;
      } else {
        this.pedidos = data;
      }

      console.log(this.pedidos)
    }, error => {
      console.log(error)
    });
  }

  setEstadoPedido(pedido) {
    console.log(pedido)
    let estado = this.getNewEstado(pedido.estado)
    if(estado !== false){
      pedido.estado = estado;
      this.servicio.setEstadoPedido(pedido).subscribe(
        data =>{
          console.log(data)
          alert("Pedido procesado correctamente.");
          this.getPedidos();
        },
        error =>{
          console.log(error)
        }
      );
    }else{
      alert('El pedido ya ha sido entregado');
    }

  }



  getNewEstado(estado) {
    switch (estado) {
      case 'solicitado':
        return 'enviado';
      case 'enviado':
        return 'confirmado';
      case 'confirmado':
        return false;
      default:
        return 'solicitado';
    }
  }

}
