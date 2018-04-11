import { BoatserviceService } from './boatservice.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { UserserviceService } from './userservice.service';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [BoatserviceService, UserserviceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
