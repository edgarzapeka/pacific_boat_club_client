import { Component }        from '@angular/core';
import {  MyRemoteService } from './app.myremoteservice';

// This component consumes the re-usable service.
@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    // Providers allow us to inject an object instance through the constructor.
    providers: [MyRemoteService]
})
export class AppComponent {
    remoteService: MyRemoteService;
    userName: string;
    password: string;
    token:    string;
    publicData:any;
    privateData:any;
    message:string;

    // Since using a provider above we can receive service.
    constructor(_remoteService: MyRemoteService) {
        this.remoteService = _remoteService;
    }

    getPublicData() {  
        this.remoteService.getPublicInfo().subscribe(
            // Success.
            data => {
                this.publicData    = data;
                console.log(data) 
            },
            // Error.
            error => {
                alert(error)
            })
    }

    getPrivateData() {
        this.remoteService.getPrivateInfo().subscribe(
            // Success.
            data => {
                this.privateData    = data;
                console.log(data)
            },
            // Error.
            error => {
                alert(error)
            })
    }

    login(userName,password) {  
        // Create the JavaScript object in the format
        // required by the server.
        let FeedBackObject = {
            "userName": userName,
            "password": password
        }
        this.remoteService.postLogin(FeedBackObject).subscribe(
            // Success.
            data => {
                // Store token with session data.
                sessionStorage.setItem('auth_token', data["token"]);
                this.token       = data["token"];
                this.message     = "The user has been logged in."
                this.privateData = null;
                this.publicData  = null;
                console.log(data)
            },
            // Error.
            error => {
                alert(error)
            })
    }

    log_out() {
        // Jwt has no sense of logout on the server so just
        // destroy the token on the client.
        sessionStorage.setItem('auth_token', null);
        this.token = null;
        this.message = "You are logged out."
    }    
}
