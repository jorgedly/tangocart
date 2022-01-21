import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Producto } from 'src/app/Estructura';
import { ClientesService } from 'src/app/services/clientes.service';
import { DetalleProductosComponent } from '../detalle-productos/detalle-productos.component';
import { EditorialService } from '../../services/editorial.service';



@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})

export class ProductosComponent implements OnInit {
  user : any = {};

  arregloLibros: any[] = [];
  constructor(public dialog: MatDialog, private servicio: EditorialService) { 
    this.user = JSON.parse(localStorage.getItem('usuario'));
    this.servicio.getAllBooks(this.user.token).subscribe(data => {
      this.arregloLibros = data;
      console.log(data)
    });
  }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('usuario'));
  }

  seleccionarLibro(libro: Producto){
    const dialogRef = this.dialog.open(DetalleProductosComponent, {
      width: '80%',
      height: '80%',
      data: libro
    });
  }
}
