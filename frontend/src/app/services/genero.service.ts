import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URLServicio } from './url';

@Injectable({
  providedIn: 'root'
})
export class GeneroService {

  URL:string = URLServicio;
  constructor(private http: HttpClient) { }

  obtenerGeneros = () => this.http.get<any>(`${ this.URL }generos/listar_generos`);

  crearGenero(genero){
    return this.http.post(`${ this.URL }generos/crear_genero`,
      {
        nombre: genero.nombre,
        descripcion: genero.descripcion
      }
    );
  }

  actualizarGenero(id, n, d){
    return this.http.post(`${ this.URL }generos/actualizar_genero`,
      {
        _id: id,
        nombre: n,
        descripcion: d
      }
    );
  }

  eliminarGenero(id){
    return this.http.post(`${ this.URL }generos/eliminar_genero`,
      {
        _id: id
      }
    );
  }

}
