import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookapiService } from './bookapi.service';
import { DetailsComponent } from './details/details.component';

import { HomeComponent } from './home/home.component';

import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { UserBooksComponent } from './user-books/user-books.component';


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'bookdetails', component: DetailsComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'myBooks', component: UserBooksComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [HomeComponent, LoginComponent, DetailsComponent, SignupComponent, UserBooksComponent]