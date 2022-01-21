import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  constructor(
    private route: Router,
    private usuarioService: UsuarioService,
    private toastr: ToastrService
    ) {}

  ngOnInit() {
    localStorage.setItem('usuario', '' );
  }
  ngOnDestroy() {
  }

  onClickSubmit(form) {
    if(Object.is(form.username,'admin') && Object.is(form.password,'')){
      localStorage.setItem('usuario', JSON.stringify({rol:"1",nombre:"admin"}) );
      this.route.navigate(['/dashboard']);
    }else if(Object.is(form.username,'cliente') && Object.is(form.password,'')){
      localStorage.setItem('usuario', JSON.stringify({rol:"2",nombre:"cliente"}) );
      this.route.navigate(['/perfil']);
    }else if(Object.is(form.username,'proveedor') && Object.is(form.password,'')){
      localStorage.setItem('usuario', JSON.stringify({rol:"3",nombre:"proveedor"}) );
      this.route.navigate(['/perfil']);
    }else{
      this.usuarioService.login(form.username, form.password)
      .subscribe(
        res => {
          console.log('entra')
          console.log(res)
          if(res['id'] === undefined){
            this.toastr.error("Credenciales invalidas");
            return;
          }

          this.toastr.success(form.username, '¡Bienvenido!', { timeOut: 4000 });
          
          let usuario = JSON.parse(JSON.stringify(res));
          
          if(Object.is(usuario.tipo,'A')){
            usuario['rol'] = '1';
            localStorage.setItem('usuario', JSON.stringify(usuario) );
            this.route.navigate(['/dashboard']);
          }else if(Object.is(usuario.tipo,'C')){
            usuario['rol'] = '2';
            localStorage.setItem('usuario', JSON.stringify(usuario) );
            this.route.navigate(['/perfil']);
          }else{
            usuario['rol'] = '3';
            localStorage.setItem('usuario', JSON.stringify(usuario) );
            this.route.navigate(['/perfil']);
          }
        },
        err => {
          console.log( 'Problema en login: ' + err.error.error )
          this.toastr.error('Error', err.error.error, {
            timeOut: 3000
          });
        }
      );

    }
  }

  esbValue : any = localStorage.getItem('grupo');

  establecerESB(){
    localStorage.setItem('grupo', this.esbValue );
    console.log(this.esbValue)
  }

}
