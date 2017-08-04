import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { Argomento } from '../_models/index';
import { ArgomentoService} from '../_services/index';

@Injectable()
export class ArgomentiResolver implements Resolve<Argomento[]> {
  constructor(private argomentoService: ArgomentoService) {}
 
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any>|Promise<any>|any {
    return this.argomentoService.getList();
  }
}