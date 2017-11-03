import { Injectable } from '@angular/core';
import { Http, XHRBackend, RequestOptions, Request, RequestOptionsArgs, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
/// <summary>
/// This custom class for Http which extends Http class
/// Automatically adds the authentication token into headers in every http request
/// </summary>
export class HttpService extends Http {

    constructor(backend: XHRBackend, options: RequestOptions) {

        console.log('HttpService======>');
        //Retrieving token value from session storage 
        let token = sessionStorage.getItem('AuthenticationToken');

        //Adding token schema (Bearer) to headers
        options.headers.set('Authorization', `Bearer ${token}`);
        //Add content type to headers
        options.headers.set('Content-Type', 'application/json;charset=utf-8');
        super(backend, options);
    }

    //Getting called for every http call
    //Adds Auth token from session storage to Headers
    request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
        //Retrieving token value from session storage 
        let token = sessionStorage.getItem('AuthenticationToken');
        //Add the token to the options, not in url
        if (typeof url === 'string') {
            if (!options) {
                // let's make option object
                options = { headers: new Headers() };
            }
            //Adding token schema (Bearer) to headers
            options.headers.set('Authorization', `Bearer ${token}`);
        } else {
            //Add the token to the url object
            url.headers.set('Authorization', `Bearer ${token}`);
        }

        //Fetch Header data from WebAPI response
        //Handles Error 
        return super.request(url, options)
            .catch(this.catchAuthError(this))
            .do((res: Response) => {
                if (res.headers.get('Authentication'))
                    sessionStorage.setItem('AuthenticationToken', res.headers.get("Authentication"));
            });
    }

    //Handles Error 
    private catchAuthError(self: HttpService) {
        //Pass HttpService's own instance here as `self`
        return (res: Response) => {
            console.log(res);
            if (res.status === 401 || res.status === 403) {
                // if not authenticated
                console.log(res);
            }
            return Observable.throw(res);
        };
    }
}