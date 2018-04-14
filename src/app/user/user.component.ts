import { Component, OnInit } from '@angular/core';
import {  MyRemoteService } from '../app.myremoteservice';
import { ViewChild } from '@angular/core';
import {} from '@types/googlemaps';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  providers: [MyRemoteService]
})
export class UserComponent implements OnInit {
  remoteService: MyRemoteService;
  privateData: Array<any>;
  @ViewChild('map') gmapElement: any;
  map: google.maps.Map;

  constructor(_remoteService: MyRemoteService) {
    this.remoteService = _remoteService;
}
  ngOnInit() {
    var mapProp = {
      center: new google.maps.LatLng(49.2827, -123.1207),
      zoom: 14,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
    this.getPrivateData(this.map);
  }

  addUsersToMap(map){
    var geocoder = new google.maps.Geocoder();

    this.privateData.map(u => {
      this.codeAddress(`${u.street}, ${u.city}, ${u.province} ${u.postalCode}, ${u.country}`, `${u.firstname} ${u.lastname}`, geocoder, map);
    })
  }

  codeAddress(address, userName, geocoder, map) {
        let marker;
        geocoder.geocode({
            'address': address
        }, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                //map.setCenter(results[0].geometry.location);
                if (marker)
                    marker.setMap(null);
                var contentString = `<h5>${userName}</h5><p>Address: ${address}</p>`;
                var infowindow = new google.maps.InfoWindow({
                    content: contentString
                });
                marker = new google.maps.Marker({
                    map: map,
                    position: results[0].geometry.location,
                    draggable: true
                });

                marker.addListener('click', function () {
                    infowindow.open(map, marker);
                });

            } else {
                //alert('Geocode was not successful for the following reason: ' + status);
                console.log(`The user: ${userName} Address failed to to on the map: ${address}`)
            }
        });
    }

  getPrivateData(map) {
    this.remoteService.getUsers().subscribe(
        // Success.privateData
        data => {
            this.privateData    = data['data'];
            console.log(this.privateData);
            this.addUsersToMap(map);
        },
        // Error.
        error => {
            alert(error)
    })
}

}
