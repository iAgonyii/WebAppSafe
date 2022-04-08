import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ScanService {

  url = 'http://localhost:7161/api/scan';

  constructor(private httpClient: HttpClient) {}

  getAllScans(): Observable<any> {
    return this.httpClient.get(this.url);
  }

  getScan(id: number): Observable<any> {
    return this.httpClient.get(this.url + '/' + id);
  }

  postScan(scan: any): void {
    this.httpClient.post(this.url, scan).subscribe();
  }


}
