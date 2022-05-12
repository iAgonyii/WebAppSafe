import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ReportService} from "../../services/report.service";

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  report: any;

  constructor(private route: ActivatedRoute, private reportService: ReportService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.reportService.getReport(params['id']).subscribe(res => {
        this.report = res;
        console.log(this.report);
      })
    })
  }

}
