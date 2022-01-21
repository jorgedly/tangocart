import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Genero, Producto } from '../Estructura';
import { URLServicio } from './url';

@Injectable({
  providedIn: 'root'
})
export class EditorialService {

  URL: string = URLServicio;
  urlPrueba: string = 'http://34.136.223.32:5000/';

  constructor(private http: HttpClient) { }
  
  getAllBooks(token:any) {

    let innerURL = this.URL  + '/api/providers/allProducts';
    if(this.URL == '1'){
      innerURL = "http://34.125.203.249/sa/bus/grupo1/productos";
    }else if(this.URL == "http://3.12.103.111:4000"){
      innerURL = this.URL  + '/api/providers/products';
    }

    return this.http.get<any>(innerURL, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `${token}`
      })
    }
    )
  }

  getAllGenres() {
    return this.http.get<Genero[]>(this.URL + 'generos/listar_generos');
  }

  createBook(libro: Producto){
    return this.http.post<any>(this.URL + 'libro/libro', libro);
  }

  editBook(libro: Producto){
    return this.http.put<any>(this.URL + 'libro/libro', libro);
  }

  deleteBook(idLibro: string) {
    return this.http.delete<any>(this.URL + 'libro/libro/?id=' + idLibro);
  }


}
