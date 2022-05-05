import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeScanComponent} from "./components/home-scan/home-scan.component";
import {ReportComponent} from "./components/report/report.component";

const routes: Routes = [
  { path: '', component: HomeScanComponent },
  { path: 'report/:id', component: ReportComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
