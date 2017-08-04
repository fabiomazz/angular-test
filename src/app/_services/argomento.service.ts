import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { Argomento } from '../_models/index';

@Injectable()
export class ArgomentoService {

    constructor(private http: Http) { }
 

    getList(): Promise<Argomento[]> {
        return this.http.get('http://mediadata_site.local/api/argomento')
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    }

    getArgomento(id: number): Promise<Argomento> {
        const url = `${'http://mediadata_site.local/api/argomento'}/${id}`;
        return this.http.get(url)
            .toPromise()
            .then(response => response.json().data as Argomento)
            .catch(this.handleError);
    } 

    private extractData(res: Response) {
        let body = res.json();
        return body._embedded.argomento || { };
    }


    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }

}