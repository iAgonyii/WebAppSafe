import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/user.service";
import {ReportService} from "../../services/report.service";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  email;
  recentReports: any = [];

  constructor(private userService: UserService, private reportService: ReportService) { }

  ngOnInit(): void {
    this.reportService.getRecentPublicReports().subscribe(res => {
      this.recentReports = res;
    });
  }

  onSubmit(formData) {
    if (formData.valid) {
      console.log(formData.value);
      this.userService.makeAdmin(formData.value.email);
      formData.reset('');
    }
  }

}
