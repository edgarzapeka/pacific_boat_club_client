import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { BoatComponent } from './boat/boat.component';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { LogoutComponent } from './logout/logout.component';
import { HomeComponent } from './home/home.component';

const appRoutes: Routes = [
  { path: 'Boat', component: BoatComponent },
  { path: 'User', component:  UserComponent },
  //{ path: 'Home', component:  AppComponent },
  { path: 'Login', component:  LoginComponent },
  { path: 'Register', component:  RegisterComponent },
  { path: 'Logout', component:  LogoutComponent },
  { path: '', component: HomeComponent },
  { path: '**', component: HomeComponent }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
