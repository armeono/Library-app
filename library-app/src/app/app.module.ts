import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { routingComponents } from './app-routing.module';
import {MatButtonModule} from '@angular/material/button';
import { BookapiService } from './bookapi.service';
import {HttpClientModule} from '@angular/common/http';

import { LoginComponent } from './login/login.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { DetailsComponent } from './details/details.component';


@NgModule({
  declarations: [
    AppComponent,
    routingComponents
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatButtonModule,
    HttpClientModule
  ],
  providers: [BookapiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
