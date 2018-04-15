import { Component, OnInit } from '@angular/core';
import {  MyRemoteService } from '../app.myremoteservice';
import { DomSanitizer } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MyRemoteService]
})
export class LoginComponent implements OnInit {
  private route: ActivatedRoute;
  private router: Router;
  returnUrl: string;
  remoteService: MyRemoteService;
  email: string;
  password: string;
  token:    string;
  email_token: string;
  publicData: any;
  privateData: Array<any>;
  message: string;
  sanitizer: DomSanitizer;

  // Since using a provider above we can receive service.
  constructor(_remoteService: MyRemoteService, sanitizer: DomSanitizer, _route: ActivatedRoute, _router: Router ) {
      this.remoteService = _remoteService;
      this.sanitizer = sanitizer;
      this.route = _route;
      this.router = _router;
      // this.getPrivateData();
  }

  ngOnInit() {
    let token = localStorage.getItem('token')
    if (token && token != "null"){
        this.router.navigate(['/']);
    }
  }
  login(email, password) {  
    // Create the JavaScript object in the format
    // required by the server.
    let FeedBackObject = {
        'email': email,
        'password': password
    }
    this.remoteService.postLogin(FeedBackObject).subscribe(
        // Success.
        data => {
            // Store token with session data.
            localStorage.setItem('token', data['token']);
            localStorage.setItem('email_token', email);
            localStorage.setItem('user_role', data['userRole']); 
            this.token       = data['token'];
            this.email_token = data['email_token'];
            this.message     = 'The user has been logged in.';
            this.privateData = null;
            this.publicData  = null;
            console.log(data);
            
            window.location.reload();
        },
        // Error.
        error => {
            alert(error);
        })
    }
}
