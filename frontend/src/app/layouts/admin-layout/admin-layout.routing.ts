import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { LibrosComponent } from '../../pages/libros/libros.component';
import { ProductosComponent } from '../../pages/productos/productos.component';
import { CarritoComponent } from '../../pages/carrito/carrito.component';
import { PerfilComponent } from 'src/app/pages/perfil/perfil.component';
import { MisproductosComponent } from 'src/app/misproductos/misproductos.component';
import { FavoriteComponent } from '../../pages/favorite/favorite.component';
import { PedidosComponent } from '../../pages/pedidos/pedidos.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'tables',         component: TablesComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'libros',         component: LibrosComponent },
    { path: 'catalogo',      component: ProductosComponent },
    { path: 'mis_productos',      component: MisproductosComponent },
    { path: 'carrito',        component: CarritoComponent },
    { path: 'perfil',        component: PerfilComponent },
    { path: 'favoritos',        component: FavoriteComponent },
    { path: 'pedidos',        component: PedidosComponent }
];
