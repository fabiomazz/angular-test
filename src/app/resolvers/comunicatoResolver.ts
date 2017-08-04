import { Injectable } from '@angular/core';
import { Resolve, ActivatedRoute, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { Comunicato } from '../_models/index';
import { ComunicatoService} from '../_services/index';

@Injectable()
export class ComunicatoResolver implements Resolve<Comunicato> {
  constructor(private comunicatoService: ComunicatoService) {}
 
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any>|Promise<any>|any {
    let par:any = route.params;
    console.log(route.params);
    return this.comunicatoService.getComunicatoFull(par.id);
  }
}