import { Component, OnInit } from '@angular/core';
import {  MyRemoteService } from '../app.myremoteservice';

@Component({
  selector: 'app-boat',
  templateUrl: './boat.component.html',
  styleUrls: ['./boat.component.css'],
  providers: [MyRemoteService]
})
export class BoatComponent implements OnInit {
  remoteService: MyRemoteService;
  privateData: Array<any>;
  constructor(_remoteService: MyRemoteService) {
    this.remoteService = _remoteService;
    this.getPrivateData();
}

  ngOnInit() {

  }

  updateBoat(Id, BoatName, BoatLengthInFeet, BoatYear, BoatCapacityInPeople, BoatPictureUrl) {
    let FeedBackObject = {
      '_id': Id,
      'BoatName': BoatName,
      'BoatLengthInFeet': BoatLengthInFeet,
      'BoatYear': BoatYear,
      'BoatCapacityInPeople': BoatCapacityInPeople,
      'BoatPictureUrl': BoatPictureUrl,
      'RentedBy': localStorage.getItem('email_token')
    }
    this.remoteService.updateBoat(FeedBackObject).subscribe(
      // Success.
      data => {
          // Store token with session data.
          // localStorage.setItem('token', data['token']);
          // this.token       = data['token'];
          //this.message     = 'boat updated.';
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


  getPrivateData() {
    this.remoteService.getBoats().subscribe(
      // Success.privateData
      data => {
          this.privateData    = data['data'];
          console.log(this.privateData);
      },
      // Error.
      error => {
          alert(error)
      })
  }

  deleteBoat(boatId){
    this.remoteService.deleteBoat(boatId).subscribe(
      data => {
        console.log(data)
        window.location.reload();
      },
      error => {
        alert(error)
      }
    )
  }
}
