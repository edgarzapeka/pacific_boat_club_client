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
  BoatName: string;
  BoatLengthInFeet: string;
  BoatYear: string;
  message: string;
  BoatPictureUrl: string;
  BoatCapacityInPeople: string;
  RentedBy: string;
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
          this.BoatName = data["data"].BoatName;
          this.BoatLengthInFeet = data["data"].BoatLengthInFeet;
          this.BoatYear = data["data"].BoatYear;
          this.BoatCapacityInPeople = data["data"].BoatCapacityInPeople;
          this.BoatPictureUrl=data["data"].BoatPictureUrl;
          this.RentedBy = data["data"].RentedBy;
          console.log('here is this boat specific data');
            console.log(data);
        }
      )
  });

  }
  // getBoat(){
 
  // }
  // }


  updateBoat(BoatName, BoatLengthInFeet, BoatYear, BoatCapacityInPeople, BoatPictureUrl, RentedBy) {
    let FeedBackObject = {
      '_id': this.id,
      'BoatName': BoatName,
      'BoatLengthInFeet': BoatLengthInFeet,
      'BoatYear': BoatYear,
      'BoatCapacityInPeople': BoatCapacityInPeople,
      'BoatPictureUrl': BoatPictureUrl,
      'RentedBy': RentedBy == null ? "" : RentedBy
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
