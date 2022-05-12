import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {ReportService} from "./report.service";

@Injectable({
  providedIn: 'root'
})
export class ScanService {
  env = environment;
  url = this.env.gate + '/scan';

  constructor(private httpClient: HttpClient, private reportService: ReportService) {}

  getAllScans(): Observable<any> {
    return this.httpClient.get(this.url + '/all');
  }

  getScan(id: number): Observable<any> {
    return this.httpClient.get(this.url + '/' + id);
  }

  postScan(scan: any): void {
    this.httpClient.post(this.url + '/add', scan, {observe: 'response'}).subscribe(res => {
      // Start polling for reports using the scan id
      console.log(res.body);
      this.reportService.startPolling(res.body);
    }, err => {
      // Emit the error message to show it in template
      this.scanError.emit(err.error);
    });
  }

  scanError: EventEmitter<string> = new EventEmitter<string>();

}
