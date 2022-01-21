import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import {MatInputModule} from '@angular/material/input';

import { ToastrModule } from 'ngx-toastr';
import { EditorialService } from './services/editorial.service';
import { ClientesService } from './services/clientes.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//Firebase images
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from '../environments/environment';
import { MisproductosComponent } from './misproductos/misproductos.component';
import { FavoriteComponent } from './pages/favorite/favorite.component';
import { PedidosComponent } from './pages/pedidos/pedidos.component';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComponentsModule,
    NgbModule,
    RouterModule,
    AppRoutingModule,
    MatInputModule,
    ToastrModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,
    AngularFireDatabaseModule
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AuthLayoutComponent,
    MisproductosComponent,
    FavoriteComponent,
    PedidosComponent
  ],
  providers: [EditorialService, ClientesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
