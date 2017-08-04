import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';
import { PrimaPaginaComponent } from './prima/prima-pagina.component';
import { SecondaPaginaComponent } from './seconda/seconda-pagina.component';
import { ComunicatoListComponent } from './seconda/comunicato-list.component';
import { ComunicatoComponent } from './seconda/comunicato.component';
import { LoginComponent } from './login/login-component';
import { ArgomentiResolver } from './resolvers/argomentiResolver';
import { ComunicatoResolver } from './resolvers/comunicatoResolver';

const routes: Routes = [
  {
    path: '',
    children: []
  },
  {
    path:"prima-pagina",
    component: PrimaPaginaComponent
    
  },
  {
    path:"seconda-pagina",
    component: SecondaPaginaComponent,
    resolve:{
      argomenti: ArgomentiResolver
    },
    children:[{
      path:":params",
      component: ComunicatoListComponent
    }]
    
  },
  { 
    path: 'login', 
    component: LoginComponent 
  },
  { 
    path: 'login/:desc', 
    component: LoginComponent 
  },
  { 
    path: 'comunicato/:id', 
    component: ComunicatoComponent,
    resolve:{
      comunicato: ComunicatoResolver
    } 
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
