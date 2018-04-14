import { Component, OnInit } from '@angular/core';
import {  MyRemoteService } from '../app.myremoteservice';

@Component({
  selector: 'app-add-boat',
  templateUrl: './add-boat.component.html',
  styleUrls: ['./add-boat.component.css'],
  providers: [MyRemoteService]
})
export class AddBoatComponent implements OnInit {

  private remoteService: MyRemoteService;
  boatName: string;
  boatLengthInFeet: string;
  boatYear: string;
  boatCapacityInPeople: string;
  boatPictureUrl: string;

  constructor(_remoteService: MyRemoteService) { 
    this.remoteService = _remoteService;
  }

  ngOnInit() {
  }

  addBoat(boatName,boatLengthInFeet, boatPictureUrl, boatCapacityInPeople, boatYear){
    let BoatModel = {
      "boatName": boatName,
      "boatLengthInFeet": boatLengthInFeet,
      "boatYear": boatYear,
      "boatCapacityInPeople": boatCapacityInPeople,
      "boatPictureUrl": boatPictureUrl,
      "rentedBy": ""
    }

    this.remoteService.addBoat(BoatModel).subscribe(
      
      data => {
          console.log(data);
      },
      
      error => {
          alert(error);
      })
    }
  }

