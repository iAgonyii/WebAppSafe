import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeScanComponent} from "./components/home-scan/home-scan.component";
import {ReportComponent} from "./components/report/report.component";
import {LoginComponent} from "./components/login/login.component";
import {RegisterComponent} from "./components/register/register.component";
import {ProfileComponent} from "./components/profile/profile.component";
import {AuthGuard} from "./services/AuthGuard";

const routes: Routes = [
  { path: '', component: HomeScanComponent },
  { path: 'report/:id', component: ReportComponent},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
