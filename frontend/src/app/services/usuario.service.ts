import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URLServicio } from './url';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  URL:string = URLServicio;
  constructor(private http: HttpClient) { }

  obtenerUsuarios = () => this.http.get<any>(`${ this.URL }usuarios/listar_usuarios`);

  crearAdmin(admin){
    return this.http.post(`${ this.URL }usuarios/agregar_admin`,
      { 
        nickname: admin.username,
        pass: admin.password,
        nombreCompleto: admin.nombre,
        telefono: admin.numero,
        correo: admin.email
      }
    );
  }

  eliminarUsuario(idAdmin, idEliminar){
    return this.http.post(`${ this.URL }usuarios/eliminar_usuario`,
      { 
        eliminadoPor: idAdmin,
        _id: idEliminar
      }
    );
  }

  registrarUsuario(user,tipo){

    let innerUrl = ""
    if(this.URL == '1'){
      innerUrl = 'http://34.125.203.249/sa/bus/grupo1/servicios'
    }else{
      innerUrl =  `${ this.URL }/api/users/signup`
    }

    console.log(innerUrl)
    console.log('Registrar')
    return this.http.post(innerUrl,
      {
        nombre: user.nombre,
        apellido: user.apellido,
        correo: user.email,
        password: user.password,
        tipo: tipo,
        tarjetas: [{
          "titular":"Juan Estrada",
          "numero":"123456789",
          "vencimiento":"09/25"
      }]

      }
    );
  }

  aprobarUsuario(idAdmin, idAprobar){
    console.log(this.URL)
    return this.http.post(`${ this.URL }usuarios/activar_usuario`,
      { 
        activadoPor: idAdmin,
        _id: idAprobar
      }
    );
  }

  login(u, p){
    console.log(this.URL)

    let innerUrl = ""
    if(this.URL == '1'){
      innerUrl = 'http://34.125.203.249/sa/bus/grupo1/servicios'
    }else{
      innerUrl =  `${ this.URL }/api/users/signin`
    }

    console.log(innerUrl)
    return this.http.post(innerUrl,
      { 
        correo: u,
        password: p
      }
    );
  }

}
