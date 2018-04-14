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
