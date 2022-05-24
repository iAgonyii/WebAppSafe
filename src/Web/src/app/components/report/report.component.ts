import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ReportService} from "../../services/report.service";
import {KeyValue} from "@angular/common";

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  report: any = {};

  constructor(private route: ActivatedRoute, private reportService: ReportService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.reportService.getReport(params['id']).subscribe(res => {
        res.observatory = JSON.parse(res.observatory)
        this.report = res;
        console.log(this.report);
      })
    })
  }

  panels = [
    {
      active: true,
      disabled: false,
      name: 'This is panel header 1',
      childPanel: [
        {
          active: true,
          name: 'This is panel header 1-1'
        },
        {
          active: false,
          name: 'This is panel header 1-2'
        }
      ]
    },
    {
      active: false,
      disabled: true,
      name: 'This is panel header 2'
    },
    {
      active: false,
      disabled: false,
      name: 'This is panel header 3'
    }
  ];

  public onCompare(_left: KeyValue<any, any>, _right: KeyValue<any, any>): number {
    return -1;
  }

}
