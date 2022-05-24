import { Component, OnInit } from '@angular/core';
import { ScanService } from './services/scan.service';
import {AngularFireAuth} from "@angular/fire/auth";
import {AuthService} from "./services/auth.service";
import {UserService} from "./services/user.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'Web';
  scans = [];
  me: any = {};

  constructor(public authService: AuthService, private userService: UserService) {}

  ngOnInit(): void {
    this.authService.authChanged.subscribe(res => {
      if (res) {
        this.userService.me().subscribe(res => {
          this.me = res;
        })
      }
    });
  }

  logout(): void {
    this.authService.logout();
    window.location.reload();
  }
}
