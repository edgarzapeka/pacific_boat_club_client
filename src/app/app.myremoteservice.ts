import { Injectable } from '@angular/core';
import { Component } from '@angular/core';
import { URLSearchParams, QueryEncoder} from '@angular/http';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { HttpClient } from '@angular/common/http';
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
       this.site = 'http://localhost:3000/'
    }

    postRegistration(_feedback: Object): Observable<Comment[]> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({
          headers: headers
        });
        let firstname: String;
        let lastname: String;
        let street: String;
        let city: String;
        let province: String;
        let postalCode: String;
        let country: String;
        let email: String;
        let password: String;
        let role: String;
        let creationDate: String;

        let dataUrl = this.site + '';

        return this.http.get(dataUrl, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    // GET  - Retreive data available to anyone. No token required.
    getPublicInfo(): Observable<Comment[]> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({
          headers: headers
        });
        headers.append( 'Authorization', 'Bearer ' + sessionStorage.getItem('auth_token'));
        options = new RequestOptions({
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
        headers.append( 'Authorization', 'Bearer '  + sessionStorage.getItem('token'));
        let options = new RequestOptions({
            headers: headers
        });
        console.log(headers);

        let dataUrl = this.site + 'protected';  
        return this.http.get(dataUrl, options)
            .map(this.extractData)
            .catch(this.handleError);
    } 

    getBoats(): Observable<Comment[]> {
        let headers = new Headers({ 'Content-Type': 'application/json' }); 

        // Need to include 'Authorization' property with token in header.
        // Read token value from the JavaScript session.
        headers.append( 'Authorization', 'JWT '  + sessionStorage.getItem('token'));
        let options = new RequestOptions({
            headers: headers
        });
        console.log(headers);

        let dataUrl = this.site + 'boat/list';  
        return this.http.get(dataUrl, options)
            .map(this.extractData)
            .catch(this.handleError);
    } 
    getUsers(): Observable<Comment[]> {
        let headers = new Headers({ 'Content-Type': 'application/json' }); 

        // Need to include 'Authorization' property with token in header.
        // Read token value from the JavaScript session.
        headers.append( 'Authorization', 'JWT '  + localStorage.getItem('token'));
        let options = new RequestOptions({
            headers: headers
        });
        console.log(headers);

        let dataUrl = this.site + 'user/list';
        return this.http.get(dataUrl, options)
            .map(this.extractData)
            .catch(this.handleError);
    } 
    getBoat(id): Observable<Comment[]> {
        let headers = new Headers({ 'Content-Type': 'application/json' }); 

        headers.append( 'Authorization', 'JWT '  + localStorage.getItem('token'));
        let options = new RequestOptions({
            headers: headers
        });
        console.log(headers);

        let dataUrl = this.site + 'boat/getBoat/' + id ;
        return this.http.get(dataUrl, options)
            .map(this.extractData)
            .catch(this.handleError);
    } 
    

    // POST - login
    postLogin(_feedback: Object): Observable<Comment[]> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        let url     = this.site + "user/authenticate";

        let LoginModel = {
            "email": _feedback["email"],
            "password": _feedback["password"]
        }
        return this.http.post(url, LoginModel, options)
            .map(this.extractData) 
            .catch(this.handleError); 
    } 

    updateBoat(_feedback: Object): Observable<Comment[]> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append( 'Authorization', 'JWT '  + localStorage.getItem('token'));
        let options = new RequestOptions({ headers: headers });
        let url = this.site + 'boat/edit/';

        let BoatModel = {
            'BoatName': _feedback['boatName'],
            'BoatLengthInFeet': _feedback['boatLengthInFeet'],
            'BoatYear': _feedback['email'],
            'BoatCapacityInPeople': _feedback['BoatCapacityInPeople'],
            "BoatPictureUrl": _feedback["BoatPictureUrl"],
            "RentedBy": _feedback["RentedBy"]
        }
        return this.http.post(url, BoatModel, options)
            .map(this.extractData) 
            .catch(this.handleError); 
    } 
    createUser(_feedback: Object): Observable<Comment[]> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        let url     = this.site + "user/createUser";

        let UserModel = {
            "firstname": _feedback["firstname"],
            "lastname": _feedback["lastname"],
            "email": _feedback["email"],
            "password": _feedback["password"],
            "street": _feedback["street"],
            "city": _feedback["city"],
            "province": _feedback["province"],
            "postalCode": _feedback["postalcode"],
            "country": _feedback["country"],
            "userrole": "member",
            "creationdate": Date.now,
        }
        return this.http.post(url, UserModel, options)
            .map(this.extractData) 
            .catch(this.handleError); 
    } 
    
    // Retreival of JSON from .NET is a success.
    private extractData(res: Response) {
        let body = res.json();
        //console.log(body.data[0].BoatName + body.data[0].BoatYear);
        return body;
    }

    // An error occurred. Notify the user.
    private handleError(error: any) {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        return Observable.throw(errMsg);
    }
}
