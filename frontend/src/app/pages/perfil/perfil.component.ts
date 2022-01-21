import { Component, OnInit } from '@angular/core';
import { pedirUsuario, Usuario } from 'src/app/Estructura';
import { ClientesService } from 'src/app/services/clientes.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  usuario: any = {
    id: '',
    correo: '',
    password: '',
    nombre: '',
    apellido : '',
    tipo: ''
  };

  constructor(private servicio: ClientesService) { 
    this.usuario = JSON.parse(localStorage.getItem('usuario'));
  }

  ngOnInit(): void {
  }

}
