import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Producto, Pedido, pedirUsuario, username, Producto2 } from '../Estructura';
import { URLServicio } from './url'

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  URL: string = URLServicio;
  urlPrueba: string = 'http://34.136.223.32:5000/';


  constructor(private http: HttpClient) { }

  getBooks() {
    return this.http.get<any[]>(this.URL + 'pedido/libros');
  }

  createOrder(pedido: any, token:any){
    console.log('PROBANDOO')
    console.log(pedido)
    let innerUrl = ""
    if(this.URL == '1'){
      innerUrl = 'http://34.125.203.249/sa/bus/grupo1/servicios';
    }else{
      innerUrl =  `${ this.URL }/api/users/compra`;
    }

    return this.http.post<any>(innerUrl, pedido,{
      headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `${token}`
        })
  } )
};

  getUser(usuario: any){
    return this.http.post<any>(this.URL + 'usuarios/get_usuario', usuario);
  }
  //NUEVOS
  createProduct(prod: any, jwt:any){
    console.log(prod)

    let innerUrl = ""
    if(this.URL == '1'){
      innerUrl = 'http://34.125.203.249/sa/bus/grupo1/servicios';
    }else{
      innerUrl =  `${ this.URL }/api/providers/newProduct`;
    }
    console.log(jwt)

    return this.http.post<any>(innerUrl, 
    {

      "nombre":prod.nombre,
      "descripcion":prod.descripcion,
      "foto":'foto/producto',
      "precio":prod.precio,
      "stock":prod.stock,
      "categorias": ["varios"]
  
    },{

    
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'authorization': `${jwt}`
    })
  });
  }  
  getMyProducts(u: username) {
    return this.http.post<Producto2[]>(this.URL + 'usuarios/misproductos',u);
  }
  editProduct(prod: Producto2){
    return this.http.put<any>(this.URL + 'usuarios/editar_producto', prod);
  }

  deleteProduct(idProd: string) {
    return this.http.delete<any>(this.URL + 'usuarios/eliminar_producto/?id=' + idProd);
  }
  finishSubasta(prod: Producto2){
    return this.http.post<any>(this.URL + 'usuarios/finalizar_puja', prod);
  }

  getPedidos(){
    return this.http.get<any>('http://www.tangocart-api.ml/servicio/' + 'pedido/pedido');
  }  

  setEstadoPedido(pedido){
    return this.http.put<any>('http://www.tangocart-api.ml/servicio/' + 'pedido/pedido', pedido);
  }


}
