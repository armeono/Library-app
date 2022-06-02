import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookapiService } from './bookapi.service';
import { DetailsComponent } from './details/details.component';

import { HomeComponent } from './home/home.component';

import { LoginComponent } from './login/login.component';
import { WelcomeComponent } from './welcome/welcome.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'welcome', component: WelcomeComponent},
  {path: 'bookdetails', component: DetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [HomeComponent, LoginComponent, WelcomeComponent, DetailsComponent]