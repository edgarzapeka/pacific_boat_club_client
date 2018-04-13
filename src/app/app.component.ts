import { Component } from '@angular/core';
import {  MyRemoteService } from './app.myremoteservice';
import { DomSanitizer } from '@angular/platform-browser';
 

// This component consumes the re-usable service.
@Component({
    selector: 'app-root',
    styleUrls: ['./app.component.css'],

     templateUrl: 'app.component.html',
    // Providers allow us to inject an object instance through the constructor.
    providers: [MyRemoteService]
})
export class AppComponent {
    remoteService: MyRemoteService;
    email: string;
    password: string;
    token:    string;
    publicData: any;
    privateData: Array<any>;
    message: string;
    sanitizer: DomSanitizer;
     

    // Since using a provider above we can receive service.
    constructor(_remoteService: MyRemoteService, sanitizer: DomSanitizer ) {
        this.remoteService = _remoteService;
        this.sanitizer = sanitizer;
        this.getPrivateData();
    }

    getPublicData() {
        this.remoteService.getPublicInfo().subscribe(
            // Success.
            data => {
                this.publicData    = data;
                console.log(data);
            },
            // Error.
            error => {
                alert(error);
            })
    }

    getPrivateData() {
        this.remoteService.getBoats().subscribe(
            // Success.privateData
            data => {
                this.privateData    = data['data'];
                //this.privateData.forEach(b => this.sanitizer.bypassSecurityTrustUrl(b.BoatPictureUrl));
                for (let i = 0; i < this.privateData.length; i++) {
                    this.privateData[i].BoatPictureUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.privateData[i].BoatPictureUrl);
                }
                console.log(this.privateData);
            },
            // Error.
            error => {
                console.log('error getting getBoat()' + error);
            })
    }

    login(email, password) {  
        // Create the JavaScript object in the format
        // required by the server.
        let FeedBackObject = {
            "email": email,
            "password": password
        }
        this.remoteService.postLogin(FeedBackObject).subscribe(
            // Success.
            data => {
                
                // Store token with session data.
                localStorage.setItem('token', data["token"]);
                this.token       = data["token"];
                this.message     = "The user has been logged in."
                this.privateData = null;
                this.publicData  = null;
                console.log(data);
            },
            // Error.
            error => {
                alert(error);
            })
    }

    log_out() {
        // Jwt has no sense of logout on the server so just
        // destroy the token on the client.
        sessionStorage.setItem('token', null);
        this.token = null;
        this.message = "You are logged out."
    }    
}
