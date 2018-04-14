import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { BoatComponent } from './boat/boat.component';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { LogoutComponent } from './logout/logout.component';

const appRoutes: Routes = [
  { path: 'Boat', component: BoatComponent },
  { path: 'User', component:  UserComponent },
  { path: 'Home', component:  AppComponent },
  { path: 'Login', component:  LoginComponent },
  { path: 'Register', component:  RegisterComponent },
  { path: 'Logout', component:  LogoutComponent },
  { path: '', redirectTo: '/Home', pathMatch: 'full' },
  { path: '**', component: AppComponent }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);