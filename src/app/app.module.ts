 
import { MyRemoteService } from './app.myremoteservice';
import { BoatserviceService } from './boatservice.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { UserserviceService } from './userservice.service';
import { BoatComponent } from './boat/boat.component';
import { UserComponent } from './user/user.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { routing } from './app.routing';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { AddBoatComponent } from './add-boat/add-boat.component';
import { EditboatComponent } from './editboat/editboat.component';

@NgModule({
  declarations: [
    AppComponent,
    BoatComponent,
    UserComponent,
    LoginComponent,
    LogoutComponent,
    RegisterComponent,
    HomeComponent,
    AddBoatComponent,
    EditboatComponent
  ],
  imports: [
    BrowserModule, FormsModule, HttpModule, routing
  ],
  providers: [BoatserviceService, UserserviceService, MyRemoteService],
  bootstrap: [AppComponent]
})
export class AppModule { }
