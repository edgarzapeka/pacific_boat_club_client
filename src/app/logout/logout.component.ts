import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {
  token:    string;
  message: string;
  constructor() { }

  ngOnInit() {
  }
  log_out() {
    // Jwt has no sense of logout on the server so just
    // destroy the token on the client.
    sessionStorage.setItem('auth_token', null);
    this.token = null;
    this.message = 'You are logged out.';
}  

}
