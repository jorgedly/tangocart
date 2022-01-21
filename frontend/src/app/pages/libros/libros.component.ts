import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Producto } from 'src/app/Estructura';
import { EditorialService } from 'src/app/services/editorial.service';
import { CuLibrosComponent } from '../cu-libros/cu-libros.component';


@Component({
  selector: 'app-libros',
  templateUrl: './libros.component.html',
  styleUrls: ['./libros.component.css']
})
export class LibrosComponent implements OnInit {

  arregloLibros: Producto[] = [];
  user : any = {};

  constructor(public dialog: MatDialog, private servicio: EditorialService) { 
    this.user = JSON.parse(localStorage.getItem('usuario'));

    this.obtenerTodos();
  }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('usuario'));
    this.obtenerTodos()
  }

  obtenerTodos(){

    this.servicio.getAllBooks(this.user.token).subscribe(data => {
      console.log('Entra get all')
      console.log(data)
      // this.arregloLibros = data.filter(product => product.proveedor.id == this.user.id);
      this.arregloLibros = data;
      // console.log(this.arregloLibros)
    }, err => {
      console.log(err)
    });
  }

  crear(){
    const dialogRef = this.dialog.open(CuLibrosComponent, {
      width: '80%',
      height: '80%'
    });
    
    dialogRef.afterClosed().subscribe(result => {
      this.obtenerTodos();
    });
  }

  editar(libro: Producto){
    const dialogRef = this.dialog.open(CuLibrosComponent, {
      width: '80%',
      height: '80%',
      data: libro
    });
  }

  eliminar(libro: Producto){
    this.servicio.deleteBook(libro._id).subscribe(data => {
      this.obtenerTodos();
      alert('Se ha eliminado el producto ' + libro.nombre + ' exitosamente');
    }, error => {
      alert('Ocurrio un error al eliminar el producto ' + libro.nombre);
    });
  }

}
