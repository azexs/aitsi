import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FlexLayoutModule} from '@angular/flex-layout';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AngularMaterialModule} from './angular-material.module';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';


import {LogInComponent} from './_components/log-in/log-in.component';
import {RegisterComponent} from './_components/register/register.component'
import {HomeComponent} from './_components/home';



import {CatalogComponent} from './_components/catalog/catalog.component';
import {MovieDetailsComponent} from './_components/movie-details/movie-details.component';
import {JwtInterceptor} from "./_helpers/jwt.interceptor";
import {ErrorInterceptor} from "./_helpers/error.interceptor";
import {AlertComponent} from "./_components/alert/alert.component";

import {BarRatingModule} from "ngx-bar-rating";
import {CommentsComponent} from './_components/comments/comments.component';
import {InfoComponent} from "./_components/info/info.component";

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LogInComponent,
    AlertComponent,
    HomeComponent,
    CatalogComponent,
    MovieDetailsComponent,
    CommentsComponent,
    InfoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    BarRatingModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
