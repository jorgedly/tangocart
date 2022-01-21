import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Producto, Producto2, username } from 'src/app/Estructura';
import { ClientesService } from 'src/app/services/clientes.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-detalle-productos',
  templateUrl: './detalle-productos.component.html',
  styleUrls: ['./detalle-productos.component.css']
})
export class DetalleProductosComponent implements OnInit {

  libro: any = {
    foto: '',
    nombre: '',
    precio: 0,
    cantidad: 0,
    categorias: [],
    proveedor: {}
  };
  puja: 0;
  arregloCarrito: any[] = [];
  isParaSubastar = false;

  constructor(public dialogRef: MatDialogRef<DetalleProductosComponent>,
    private servicio2: ClientesService,
    @Inject(MAT_DIALOG_DATA) public data: any, private toastr: ToastrService) { 
      this.libro = data;
      if(this.libro.timepoFinSubasta!=''){
        this.isParaSubastar=true;
      }else{
        this.isParaSubastar=false;
      }

    }

  ngOnInit(): void {
    
  }

  cancelar(){
    this.dialogRef.close();
  }
  pujar(){
    if(this.libro.precio<this.puja){
      this.libro.precio = this.puja;
      var u = localStorage.getItem('username')
      var ux : username = {
        username: ''
      };
      ux.username =  u;
  
      // Envio de datos--------------------------------------------------
      this.libro.usernameComprador = ux.username;
  
      this.servicio2.editProduct(this.libro).subscribe(data => {
        alert('El producto ' + this.libro.nombre + ' se ha editado existosamente');
        this.dialogRef.close();
      }, error => {
        alert('Ha existido un error al editar el producto ' + this.libro.nombre);
      });
    }else{
      alert("El precio de puja debe ser mayor al actual");
    }
  }


  agregar(){
    alert('Se ha agregado el producto al carrito correctamente');
    var guardado = JSON.parse(localStorage.getItem('carrito'));
    if(guardado != null){
      this.arregloCarrito = guardado;
    }
    this.libro.cantidad = 1;
    this.arregloCarrito.push(this.libro);
    localStorage.setItem('carrito', JSON.stringify(this.arregloCarrito));
    this.dialogRef.close();
  }

  addFavorite(){
    var favoritos : any = (JSON.parse(localStorage.getItem('favoritos')) !== undefined) ? JSON.parse(localStorage.getItem('favoritos')) : [];
    if(!favoritos?.includes(this.libro._id)){

      if( favoritos === null || favoritos === undefined){
        favoritos = [];
      }
      favoritos.push(this.libro._id);
      localStorage.setItem('favoritos', JSON.stringify(favoritos));
      this.toastr.success('¡Producto añadido a favoritos exitosamente!', 'Favoritos', { timeOut: 4000 });
    }
  }
}
