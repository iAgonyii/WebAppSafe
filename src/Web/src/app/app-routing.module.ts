import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeScanComponent} from "./components/home-scan/home-scan.component";

const routes: Routes = [
  { path: '', component: HomeScanComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
