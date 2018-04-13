import { Component, OnInit } from '@angular/core';
import {  MyRemoteService } from '../app.myremoteservice';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  providers: [MyRemoteService]
})
export class UserComponent implements OnInit {
  remoteService: MyRemoteService;
  privateData: Array<any>;
  constructor(_remoteService: MyRemoteService) {
    this.remoteService = _remoteService;
    this.getPrivateData();
}
  ngOnInit() {
  }
  getPrivateData() {
    this.remoteService.getUsers().subscribe(
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

}
