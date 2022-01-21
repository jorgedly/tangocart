import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'ni-tv-2 text-blue', class: '' },
    { path: '/icons', title: 'Icons',  icon:'ni-planet text-orange', class: '' },
    { path: '/maps', title: 'Maps',  icon:'ni-pin-3 text-yellow', class: '' },
    { path: '/user-profile', title: 'User profile',  icon:'ni-single-02 text-red', class: '' },
    { path: '/tables', title: 'Tables',  icon:'ni-bullet-list-67 text-info', class: '' },
    { path: '/login', title: 'Login',  icon:'ni-key-25 text-pink', class: '' },
    { path: '/register', title: 'Register',  icon:'ni-circle-08 text-blue', class: '' },
    { path: '/libros', title: 'Libros',  icon:'ni-book-bookmark text-orange', class: '' },
    { path: '/catalogo', title: 'Catalogo',  icon:'ni-book-bookmark text-yellow', class: '' },
    { path: '/carrito', title: 'Carrito',  icon:'ni-basket text-red', class: '' },
    { path: '/dashboard', title: 'Dashboard',  icon: 'ni-tv-2 text-primary', class: '' },
    { path: '/icons', title: 'Icons',  icon:'ni-planet text-blue', class: '' },
    { path: '/maps', title: 'Maps',  icon:'ni-pin-3 text-orange', class: '' },
    { path: '/favoritos', title: 'Favoritos',  icon:'ni-star text-orange', class: '' },
    { path: '/pedidos', title: 'Pedidos',  icon:'ni-star text-orange', class: '' }
];

export const ROUTES_ADMIN: RouteInfo[] = [
  { path: '/dashboard', title: 'Dashboard',  icon: 'ni-tv-2 text-primary', class: '' },
  { path: '/user-profile', title: 'CRUD Usuarios',  icon:'ni-single-02 text-yellow', class: '' },
  { path: '/tables', title: 'Solicitudes',  icon:'ni-bullet-list-67 text-red', class: '' },
  { path: '/pedidos', title: 'Pedidos',  icon:'ni-delivery-fast text-blue', class: '' }
];

export const ROUTES_EDITORIAL: RouteInfo[] = [
  { path: '/perfil', title: 'Perfil',  icon:'ni-circle-08 text-blue', class: '' },
  { path: '/libros', title: 'Productos',  icon:'ni-book-bookmark text-orange', class: '' },
  { path: '/pedidos', title: 'Pedidos',  icon:'ni-delivery-fast text-blue', class: '' }
];

export const ROUTES_CLIENTE: RouteInfo[] = [
  { path: '/perfil', title: 'Perfil',  icon:'ni-circle-08 text-orange', class: '' },
  { path: '/catalogo', title: 'Catalogo',  icon:'ni-book-bookmark text-yellow', class: '' },
  { path: '/mis_productos', title: 'Mis Productos',  icon:'ni-shop text-green', class: '' },
  { path: '/carrito', title: 'Carrito',  icon:'ni-basket text-red', class: '' },
  { path: '/favoritos', title: 'Favoritos',  icon:'ni-favourite-28 text-orange', class: '' },
  { path: '/pedidos', title: 'Pedidos',  icon:'ni-delivery-fast text-blue', class: '' }
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public menuItems: any[];
  public isCollapsed = true;
  
  isAdmin:boolean;
  isCliente:boolean;
  isEditorial:boolean;

  constructor(private router: Router) { }

  ngOnInit() {
    const usuario = JSON.parse(localStorage.getItem('usuario'));
    // 1->admin, 2->cliente, 3->editorial
    this.isAdmin = usuario.rol === '1' ? true : false;
    this.isCliente = usuario.rol === '2' ? true : false;
    this.isEditorial = usuario.rol === '3' ? true : false;
    console.log("rol del usuario:"+usuario.rol)

    if(this.isAdmin){
      this.menuItems = ROUTES_ADMIN.filter(menuItem => menuItem);
    }
    else if(this.isCliente){
      this.menuItems = ROUTES_CLIENTE.filter(menuItem => menuItem);
    }else if(this.isEditorial){
      this.menuItems = ROUTES_EDITORIAL.filter(menuItem => menuItem);
    }
    
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
   });
  }

}
