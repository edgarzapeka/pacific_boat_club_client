import { Component, OnInit } from '@angular/core';
import {  MyRemoteService } from '../app.myremoteservice';
import { DomSanitizer } from '@angular/platform-browser';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-editboat',
  templateUrl: './editboat.component.html',
  styleUrls: ['./editboat.component.css']
})
export class EditboatComponent implements OnInit {
  private route: ActivatedRoute;
  private router: Router;
  returnUrl: string;
  remoteService: MyRemoteService;
  sanitizer: DomSanitizer;
  boatName: string;
  message: string;
  id: string;
  constructor(_remoteService: MyRemoteService, sanitizer: DomSanitizer, _route: ActivatedRoute, _router: Router ) {
    this.remoteService = _remoteService;
    this.sanitizer = sanitizer;
    this.route = _route;
    this.router = _router;
    // this.getPrivateData();
}

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      this.id = params['id'];
      this.remoteService.getBoat(this.id).subscribe(
        data => {
          console.log('here is this boat specific data');
            console.log(data);
        }
      )
  });

  }
  // getBoat(){
 
  // }
  // }
  updateBoat(boatName, boatLengthInFeet) {
    let FeedBackObject = {
      'BoatName': boatName,
      'BoatLengthInFeet': boatLengthInFeet
  }
    this.remoteService.updateBoat(FeedBackObject).subscribe(
      // Success.
      data => {
          // Store token with session data.
          // localStorage.setItem('token', data['token']);
          // this.token       = data['token'];
          this.message     = 'boat updated.';
         // this.privateData = null;
         // this.publicData  = null;
          console.log(data);
          window.location.reload();
      },
      // Error.
      error => {
          alert(error);
      })
  }

}
