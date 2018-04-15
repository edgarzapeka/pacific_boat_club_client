import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {
  private router: Router;
  token:    string;
  message: string;
  constructor(_router: Router) { 
    let token = localStorage.getItem('token')
    if (token && token != "null"){
      this.log_out();
    }
    this.router.navigateByUrl('/');
  }

  ngOnInit() {
  }
  log_out() {
    // Jwt has no sense of logout on the server so just
    // destroy the token on the client.
    localStorage.setItem('token', null);
    localStorage.setItem('email_token', null);
    localStorage.setItem('user_role', null); 
    window.location.reload();
    this.message = 'You are logged out.';
}  

}
