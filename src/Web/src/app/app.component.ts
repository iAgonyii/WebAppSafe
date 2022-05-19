import { Component, OnInit } from '@angular/core';
import { ScanService } from './services/scan.service';
import {AngularFireAuth} from "@angular/fire/auth";
import {AuthService} from "./services/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'Web';
  scans = [];

  constructor(private scanService: ScanService, public authService: AuthService) {}

  ngOnInit(): void {
    // this.scanService.getAllScans().subscribe(res => {
    //   this.scans = res;
    // });
  }

  logout(): void {
    this.authService.logout();
  }
}
