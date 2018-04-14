import { Component, OnInit } from '@angular/core';
import {  MyRemoteService } from '../app.myremoteservice';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [MyRemoteService]
})
export class RegisterComponent implements OnInit {
  private router: Router;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  street: string;
  city:  string;
  province: string;
  postalcode: string;
  country: string;
  userrole: string;
  creationdate: Date;
  remoteService: MyRemoteService;
  sanitizer: DomSanitizer;
   constructor(_remoteService: MyRemoteService, sanitizer: DomSanitizer, _router: Router) {
      this.remoteService = _remoteService;
      this.sanitizer = sanitizer;
      this.router = _router;
      // this.getPrivateData();
  }

  ngOnInit() {
    let token = localStorage.getItem('token')
    if (token && token != "null"){
        this.router.navigate(['/']);
    }
  }

  register(firstname,lastname,email, password,street,city, province, postalcode, country){
    let FeedBackObject = {
        'firstname': firstname,
        'lastname': lastname,
        'passowrd': password,
        'street': street,
        'city': city,
        'province': province,
        'postalCode': postalcode,
        'country': country
    }
    this.remoteService.createUser(FeedBackObject).subscribe(
      data => {
        console.log(data);
      },
      error => {
        alert(error);
      })
  }
}
