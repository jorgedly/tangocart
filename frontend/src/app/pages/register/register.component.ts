import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private usuarioService: UsuarioService, private toastr: ToastrService) { }

  ngOnInit() {
  }

  crearUsuarioE(usuario){
    this.usuarioService.registrarUsuario(usuario,"P")
      .subscribe(
        res => {
          this.toastr.success( 'Usuario creado exitosamente', 'Registrar usuario', { timeOut: 3000 });
          console.log( res );
        },
        err => {
          this.toastr.error( 'Error al crear el usuario', 'Registrar usuario', { timeOut: 3000 });
          console.log('Problema en registro',err.error.Mensaje )          
      }
    );
  }

  crearUsuarioC(usuario){
    this.usuarioService.registrarUsuario(usuario,"C")
      .subscribe(
        res => {
          this.toastr.success( 'Usuario creado exitosamente', 'Registrar usuario', { timeOut: 3000 });
          console.log( res );
        },
        err => {
          this.toastr.error( 'Error al crear el usuario', 'Registrar usuario', { timeOut: 3000 });
          console.log('Problema en registro',err.error.Mensaje )          
      }
    );
  }

}
