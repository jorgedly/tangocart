import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ClipboardModule } from 'ngx-clipboard';

import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LibrosComponent } from 'src/app/pages/libros/libros.component';
import { CarritoComponent } from 'src/app/pages/carrito/carrito.component';
import { CuLibrosComponent } from 'src/app/pages/cu-libros/cu-libros.component';
import { DetalleProductosComponent } from 'src/app/pages/detalle-productos/detalle-productos.component';
// import { ToastrModule } from 'ngx-toastr';
import {MatInputModule} from '@angular/material/input';
import { ProductosComponent } from 'src/app/pages/productos/productos.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { PerfilComponent } from 'src/app/pages/perfil/perfil.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    ClipboardModule,
    MatInputModule,
    MatCheckboxModule
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    TablesComponent,
    IconsComponent,
    MapsComponent,
    LibrosComponent,
    CarritoComponent,
    CuLibrosComponent,
    DetalleProductosComponent,
    ProductosComponent,
    PerfilComponent
  ]
})

export class AdminLayoutModule {}
