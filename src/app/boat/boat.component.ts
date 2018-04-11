import { Component, OnInit } from '@angular/core';
import {  MyRemoteService } from '../app.myremoteservice';

@Component({
  selector: 'app-boat',
  templateUrl: './boat.component.html',
  styleUrls: ['./boat.component.css'],
  providers: [MyRemoteService]
})
export class BoatComponent implements OnInit {
  privateData: any;
  remoteService: MyRemoteService;
  constructor(_remoteService: MyRemoteService) {
    this.remoteService = _remoteService;
    
}

  ngOnInit() {

  }

}
