import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PrimaPaginaComponent } from './prima/prima-pagina.component';
import { SecondaPaginaComponent } from './seconda/seconda-pagina.component';
import { ComunicatoListComponent } from './seconda/comunicato-list.component';
import { ComunicatoComponent } from './seconda/comunicato.component';
import { LoginComponent } from './login/login-component';
import { AuthenticationService, ArgomentoService, ComunicatoService, SyncComService } from './_services/index';

import { ArgomentiResolver } from './resolvers/argomentiResolver';
import { ComunicatoResolver } from './resolvers/comunicatoResolver';

import { UserService } from './_services/user.service';

import { AppConfig } from './app.config';

import {HttpClient} from './_services/httpCustom.service';

export function configData(config: AppConfig) {
  return () => config.load()
  //return  new HttpLoading(backend, defaultOptions, globalService);
}


@NgModule({
  declarations: [
    AppComponent, 
    PrimaPaginaComponent, 
    SecondaPaginaComponent, 
    LoginComponent,
    ComunicatoListComponent,
    ComunicatoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [
    AuthenticationService,
    UserService,
    ArgomentoService,
    ComunicatoService,
    SyncComService,
    ArgomentiResolver,
    ComunicatoResolver,
    AppConfig,
    HttpClient,
    { 
      provide: APP_INITIALIZER, 
      useFactory: configData, 
      deps: [AppConfig], multi: true 
    }
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
