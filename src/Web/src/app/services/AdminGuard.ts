import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
import {UserService} from "./user.service";
import {map} from "rxjs/operators";

@Injectable()
export class AdminGuard implements CanActivate {

  constructor(public auth: AuthService, public router: Router, public userService: UserService) {}

  canActivate() {
    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['login']);
      return false;
    }
    return this.checkAdmin();
  }

  checkAdmin() {
    return this.userService.me().pipe(
      map((res) => {
        return res.adminl
      })
    );
  }
}
