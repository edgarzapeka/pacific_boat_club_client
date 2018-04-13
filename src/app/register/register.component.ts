import { Component, OnInit } from '@angular/core';
import {  MyRemoteService } from '../app.myremoteservice';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [MyRemoteService]
})
export class RegisterComponent implements OnInit {
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
   constructor(_remoteService: MyRemoteService, sanitizer: DomSanitizer ) {
      this.remoteService = _remoteService;
      this.sanitizer = sanitizer;
      // this.getPrivateData();
  }

  ngOnInit() {
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
