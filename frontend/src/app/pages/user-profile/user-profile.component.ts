import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  listaUsuariosE: any[] = [];
  listaUsuariosC: any[] = [];
  listaUsuariosA: any[] = [];

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit() {
    this.obtenerUsuarios();
  }

  obtenerUsuarios(){
    this.usuarioService.obtenerUsuarios()
      .subscribe( res =>{
        for (let i = 0; i < res.length; i++) {
          //if(res[i].activo == "true"){
          if(JSON.parse(res[i].activo)){
            if(Object.is(res[i].tipoUsuario,'editorial')){
              if(JSON.parse(res[i].validado)){
                this.listaUsuariosE.push({id:res[i]._id, nombre:res[i].nombreCompleto, activo:res[i].activo})
              }
            }else if(Object.is(res[i].tipoUsuario,'cliente')){
              this.listaUsuariosC.push({id:res[i]._id, usuario:res[i].nickname,nombres:res[i].nombreCompleto,telefono:res[i].telefono, activo:res[i].activo})
            }else if(Object.is(res[i].tipoUsuario,'admin')){
              this.listaUsuariosA.push({id:res[i]._id, usuario:res[i].nickname,nombres:res[i].nombreCompleto,telefono:res[i].telefono, activo:res[i].activo})
            }
          }else{
            //console.log(`no activo, dato i=${i} - `+res[i].activo)
          }
        }
      }, err => {
        console.log('Problema en obtener usuarios',err.error.Mensaje )     
      }
    );
  }

  crearAdmin(admin){
    this.usuarioService.crearAdmin(admin)
      .subscribe(
        res => {
          console.log( res );
          this.listaUsuariosE = [];
          this.listaUsuariosC = [];
          this.listaUsuariosA = [];
          this.obtenerUsuarios();
        },
        err => {
          console.log('Problema en registro de admin',err.error.Mensaje )          
      }
    );
  }

  eliminarUsuario(user){
    console.log("eliminando..."+user.id)
    this.usuarioService.eliminarUsuario(1,user.id)
      .subscribe(
        res => {
          console.log( res );
          this.listaUsuariosE = [];
          this.listaUsuariosC = [];
          this.listaUsuariosA = [];
          this.obtenerUsuarios();
        },
        err => {
          console.log('Problema en eliminacion de usuario',err.error.Mensaje )          
      }
    );
  }

}
