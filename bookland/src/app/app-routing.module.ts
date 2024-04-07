import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LogInComponent} from './_components/log-in/log-in.component';
import {RegisterComponent} from './_components/register/register.component';
import {HomeComponent} from "./_components/home";
import {MovieDetailsComponent} from "./_components/movie-details/movie-details.component";
import {InfoComponent} from "./_components/info/info.component";


const routes: Routes = [
  {path: '', redirectTo: 'books', pathMatch: 'full'},
  {path: 'info', component: InfoComponent},
  {path: 'books', component: HomeComponent},
  {path: 'books/:id', component: MovieDetailsComponent},
  {path: 'login', component: LogInComponent},
  {path: 'register', component: RegisterComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
