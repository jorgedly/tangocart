import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss']
})
export class TablesComponent implements OnInit {
  
  listaUsuariosE: any[] = [];

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit() {
    this.obtenerUsuarios();
  }

  obtenerUsuarios(){
    this.usuarioService.obtenerUsuarios()
      .subscribe( res =>{
        for (let i = 0; i < res.length; i++) {
          if(Object.is(res[i].tipoUsuario,'editorial')){
              if(JSON.parse(res[i].activo) && !JSON.parse(res[i].validado)){
                this.listaUsuariosE.push({id:res[i]._id, nombre:res[i].nombreCompleto, activo:res[i].activo})
            }
          }
        }
      }, err => {
        console.log('Problema en obtener usuarios',err.error.Mensaje )     
      }
    );
  }

  aprobarEditorial(editorial){
    this.usuarioService.aprobarUsuario(1,editorial.id)
      .subscribe(
        res => {
          console.log( res );
          this.listaUsuariosE = [];
          this.obtenerUsuarios();
        },
        err => {
          console.log('Problema en aprobacion de empresa',err.error.Mensaje )          
      }
    );
  }

}
