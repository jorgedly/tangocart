import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Producto, username } from '../Estructura';
import { CuLibrosComponent } from '../pages/cu-libros/cu-libros.component';
import { DetalleProductosComponent } from '../pages/detalle-productos/detalle-productos.component';
import { ClientesService } from '../services/clientes.service';

@Component({
  selector: 'app-misproductos',
  templateUrl: './misproductos.component.html',
  styleUrls: ['./misproductos.component.css']
})
export class MisproductosComponent implements OnInit {

  user : any = {};

  arregloLibros: Producto[] = [];
  constructor(public dialog: MatDialog, private servicio: ClientesService) { 
    var u = localStorage.getItem('username')
    var ux : username = {
      username: ''
    };
    ux.username =  u;
    this.servicio.getMyProducts(ux).subscribe(data => {
      this.arregloLibros = data.filter(product => product.proveedor._id == this.user._id);
      console.log(this.arregloLibros)
    });
  }
  obtenerMisProductos(){
    var u = localStorage.getItem('username')
    var ux : username = {
      username: ''
    };
    ux.username =  u;
    this.servicio.getMyProducts(ux).subscribe(data => {
      console.log(data)
      // this.arregloLibros = data.filter(product => product.proveedor._id == this.user._id);
      this.arregloLibros = data;
      console.log(this.arregloLibros)
    
    });
  }
  crear(){
    const dialogRef = this.dialog.open(CuLibrosComponent, {
      width: '80%',
      height: '80%'
    });
    
    dialogRef.afterClosed().subscribe(result => {
      this.obtenerMisProductos();
    });
  }
  
  editar(libro: Producto){
    const dialogRef = this.dialog.open(CuLibrosComponent, {
      width: '80%',
      height: '80%',
      data: libro
    });
    dialogRef.afterClosed().subscribe(result => {
      this.obtenerMisProductos();
    });
  }

  eliminar(libro: Producto){
    this.servicio.deleteProduct(libro._id).subscribe(data => {
      this.obtenerMisProductos();
      alert('Se ha eliminado el producto ' + libro.nombre + ' exitosamente');
    }, error => {
      alert('Ocurrio un error al eliminar el producto ' + libro.nombre);
    });
  }


  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('usuario'));
  }

}
