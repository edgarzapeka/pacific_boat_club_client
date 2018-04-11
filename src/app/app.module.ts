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

@NgModule({
  declarations: [
    AppComponent,
    BoatComponent,
    UserComponent
  ],
  imports: [
    BrowserModule, FormsModule, HttpModule
  ],
  providers: [BoatserviceService, UserserviceService, MyRemoteService],
  bootstrap: [AppComponent]
})
export class AppModule { }
