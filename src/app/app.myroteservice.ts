import { Injectable } from '@angular/core';
import { Component } from '@angular/core';
import { URLSearchParams, QueryEncoder} from '@angular/http';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw'; 
export class LoginModel {
    Username: string;
    Password: string;
}
@Injectable()
export class MyRemoteService {
    loginModel: LoginModel;
    public site: string;
    constructor(private http: Http) { 
       this.site = 'http://localhost:3000/tokenapi/'
    }

    // GET  - Retreive data available to anyone. No token required.
    getPublicInfo(): Observable<Comment[]> {
        let headers = new Headers({ 'Content-Type': 'application/json' }); 
        let options = new RequestOptions({
          headers: headers
        });

        let dataUrl = this.site + 'public';  
        return this.http.get(dataUrl, options)
            .map(this.extractData)
            .catch(this.handleError);
    } 

    // GET - Retrieve data that is available to authorized users only.
    // Token required.
    getPrivateInfo(): Observable<Comment[]> {
        let headers = new Headers({ 'Content-Type': 'application/json' }); 

        // Need to include 'Authorization' property with token in header.
        // Read token value from the JavaScript session.
        headers.append( 'Authorization', 'Bearer ' 
                     + sessionStorage.getItem('auth_token'))
        let options = new RequestOptions({
            headers: headers
        });
        console.log(headers);

        let dataUrl = this.site + 'protected';  
        return this.http.get(dataUrl, options)
            .map(this.extractData)
            .catch(this.handleError);
    } 

    // POST - login
    postLogin(_feedback: Object): Observable<Comment[]> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        let url     = this.site + "login";

        let LoginModel = {
            "Email": _feedback["userName"],
            "Password": _feedback["password"]
        }
        return this.http.post(url, LoginModel, options)
            .map(this.extractData) 
            .catch(this.handleError); 
    } 
    
    // Retreival of JSON from .NET is a success.
    private extractData(res: Response) {
        let body = res.json();
        return body;
    }

    // An error occurred. Notify the user.
    private handleError(error: any) {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        return Observable.throw(errMsg);
    }
}
