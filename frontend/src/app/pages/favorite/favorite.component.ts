import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Producto } from 'src/app/Estructura';
import { ClientesService } from 'src/app/services/clientes.service';
import { DetalleProductosComponent } from '../detalle-productos/detalle-productos.component';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css']
})
export class FavoriteComponent implements OnInit {

  productos: Producto[] = [];

  constructor(public dialog: MatDialog, private servicio: ClientesService) { 
    this.servicio.getBooks().subscribe(data => {
      this.productos = [];
      var favoritos : any = (JSON.parse(localStorage.getItem('favoritos')) !== null) ? JSON.parse(localStorage.getItem('favoritos')) : [];
   
      for(let product of data){
        if(favoritos.includes(product._id)){
          this.productos.push(product)
        }

      }
      // this.productos = data;
    });
  }

  ngOnInit(): void {
  }

  seleccionarLibro(libro: Producto){
    const dialogRef = this.dialog.open(DetalleProductosComponent, {
      width: '80%',
      height: '80%',
      data: libro
    });
  }
}
