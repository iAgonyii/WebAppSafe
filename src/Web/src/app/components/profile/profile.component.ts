import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/user.service";
import {ReportService} from "../../services/report.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  me: any = {};
  recentReports: any = [];

  constructor(private userService: UserService, private reportService: ReportService) { }

  ngOnInit(): void {
    this.userService.me().subscribe(res => {
      this.me = res;
      this.reportService.getMyRecentReports().subscribe(res => {
        console.log(res);
        this.recentReports = res;
      });
    });
  }
}
