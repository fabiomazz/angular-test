import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions, RequestOptionsArgs, URLSearchParams } from '@angular/http';
import {HttpClient} from './httpCustom.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { Comunicato } from '../_models/comunicato';

@Injectable()
export class ComunicatoService {

    constructor(private http: HttpClient) { }
 

    getList(params): Promise<Comunicato[]> {

        //console.log(params);
        let options: URLSearchParams = new URLSearchParams();
        options = new URLSearchParams();
        for (var key in params) {
          if (params.hasOwnProperty(key)) {
              let val = params[key];
              options.set(key, val);
          }
        }

        params.page = 1;    
        let searchPar = new RequestOptions({search:options});
        //console.log(searchPar);

        const url = `${'http://mediadata_site.local/api/comunicato'}`;
        return this.http.get(url, searchPar)
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);

    }

    getComunicato(id, params={}) {

        /*
        let options: URLSearchParams = new URLSearchParams();
        options = new URLSearchParams();
        for (var key in params) {
          if (params.hasOwnProperty(key)) {
              let val = params[key];
              options.set(key, val);
          }
        }

        let searchPar = new RequestOptions({search:options});
        */

        const url = `${'http://mediadata_site.local/api/comunicato'}/${id}`;
        return this.http.get(url, params).toPromise();
            //.toPromise()
            //.then(this.extractComunicato)
            //.catch(this.handleError);

    }

    getComunicatoFull(id) {
        return this.getComunicato(id, {"full":"1"});
        //console.log(params);
        

    }

/*
    getArgomento(id: number): Promise<Argomento> {
        return this.http.get(url)
            .toPromise()
            .then(response => response.json().data as Argomento)
            .catch(this.handleError);
    } 
*/

    private extractData(res: Response) {
        console.log(res);
        let body = res.json();
        return body._embedded.comunicato || { };
    }

    private extractComunicato(res: Response) {
        let body = res.json();
        return body || { };
    }


    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }

}