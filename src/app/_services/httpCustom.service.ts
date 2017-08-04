import {Injectable} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import {Http, Headers, Response, RequestOptions, URLSearchParams, RequestOptionsArgs} from '@angular/http';

@Injectable()
export class HttpClient {

  constructor(
      private router: Router,
      private http: Http) {}

  createHeader(rOption:RequestOptions, access_token=null) {
    //prima cerco di aggiornare il token
    let headers = new Headers();
    let accessToken = access_token ? access_token : localStorage.getItem('access_token');
    headers.append('Authorization', 'Bearer ' + accessToken);
    rOption.headers = headers;
    //return headers;
    
    /*
    let refresh_token = localStorage.getItem('refresh_token');
    let user = response.json();
    if (user && user.access_token && user.refresh_token) {
        console.log(user);
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('access_token', user.access_token);
        localStorage.setItem('refresh_token', user.refresh_token);
    }
    response.
    return user.access_token;
    headers.append('Authorization', 'Bearer ' + localStorage.getItem('access_token'));
    
    return this.refreshToken(refresh_token).map((response: Response) => {
                // login successful if there's a jwt token in the response
            });
    */
  }

  get(url, params): Observable<Response> {

    
        

    //prima cosa il token è valido
    let headers = new Headers();
    let options = new URLSearchParams();
        //options = new URLSearchParams();
        for (var key in params) {
            if (params.hasOwnProperty(key)) {
                let val = params[key];
                options.set(key, val);
            }
        }
    let rOptions = new RequestOptions({"search":options});
    this.createHeader(rOptions);


    /*
    this.isValidToken().map((response: Response) => {
        console.log(response);
    });

    */

    return this.http.get(url, rOptions).map((res)=>{
        return res;
    })
        .catch(error =>{
            if(error.status == 401){
                return this.refreshToken().flatMap((newToken) =>{

                    let newAccessToken = newToken.json();
                    localStorage.setItem('access_token', newAccessToken['access_token']);
                    localStorage.setItem('refresh_token', newAccessToken['refresh_token']);
                    
                    //aggiorno gli headers con i valori corretti e inoltro la chiamata
                    this.createHeader(rOptions);
                    return this.http.request(url, rOptions);

                }).catch(error => {
                    this.router.navigate(['/login', 'expire']);
                    return Observable.throw(error);
                });
            } else {
                return Observable.throw(error);
            }
        })
    
  }

  post(url, data) {
    let headers = new Headers();
    //this.createAuthorizationHeader(headers);
    return this.http.post(url, data, {
      headers: headers
    });
  }

  options(url: string, options?: RequestOptionsArgs): Observable<Response>{
    //default options
    let accessToken = localStorage.getItem('access_token');
      let headers = new Headers();
      headers.append('Authorization', 'Bearer ' + accessToken);
      console.log(headers);
      let rOptions = new RequestOptions({"headers":headers});

      options = options ? options : rOptions;

    console.log(options);

      return this.http.options(url, options);
  };


  refreshToken(){
      let refreshToken = localStorage.getItem('refresh_token');
      return this.http.post('http://mediadata_site.local/api/oauth', { 
          grant_type: "refresh_token", 
          client_id: "www.mediaddress.it", 
          refresh_token:refreshToken});
  }

  isValidToken(){
      let accessToken = localStorage.getItem('access_token');
      let headers = new Headers();
      headers.append('Authorization', 'Bearer ' + accessToken);
      //console.log(headers);
      let rOptions = new RequestOptions({"headers":headers});
      //console.log("qui");
      return this.http.get('http://mediadata_site.local/api/oauth/resource', rOptions);
  }

}