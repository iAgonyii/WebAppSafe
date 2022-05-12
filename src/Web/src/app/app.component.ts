import { Component, OnInit } from '@angular/core';
import { ScanService } from './services/scan.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'Web';
  scans = [];

  constructor(private scanService: ScanService) {}

  ngOnInit(): void {
    // this.scanService.getAllScans().subscribe(res => {
    //   this.scans = res;
    // });
  }


}
