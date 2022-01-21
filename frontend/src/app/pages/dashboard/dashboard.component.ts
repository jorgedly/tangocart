import { Component, OnInit } from '@angular/core';
import { GeneroService } from 'src/app/services/genero.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  id_seleccionado: number;
  nombre: string;
  descripcion: string;
  listaGeneros: any[] = [];

  constructor(private generoService: GeneroService, private toastr: ToastrService) { }

  ngOnInit() {
    this.obtenerGeneros();
  }

  crearGenero(genero){
    this.generoService.crearGenero(genero)
      .subscribe(
        res => {
          this.listaGeneros = [];
          this.obtenerGeneros();
        },
        err => {
          console.log('Problema en registro de genero',err.error.Mensaje )          
      }
    );
  }

  obtenerGeneros(){
    this.generoService.obtenerGeneros()
      .subscribe(
        res =>{
          for (let i = 0; i < res.length; i++) {
            this.listaGeneros.push({id:res[i]._id, nombre:res[i].nombre, descripcion:res[i].descripcion})
          }
        }, err => {
          console.log('Problema en obtener usuarios',err.error.Mensaje )     
        }
      );
  }

  editar(genero: any){
    this.id_seleccionado = genero.id
    this.nombre = genero.nombre
    this.descripcion = genero.descripcion
  }

  eliminar(id){
    console.log(id)
    this.generoService.eliminarGenero(id)
      .subscribe(
        res => {
          this.listaGeneros = [];
          this.obtenerGeneros();
        },
        err => {
          console.log('Problema en eliminacion de genero',err.error.Mensaje )          
      }
    );
  }

  guardar(id,nombre,descripcion){
    this.generoService.actualizarGenero(id,nombre,descripcion)
      .subscribe((val) => {
      }, response => {
          console.log("POST call in error", response);
          this.toastr.error('Error', 'No ha sido guardado', {
            timeOut: 3000
          });
      },
      () => {
          this.id_seleccionado = -1;
          this.nombre = "";
          this.descripcion = "";
          this.listaGeneros = [];
          this.obtenerGeneros();
    });
  }

}
