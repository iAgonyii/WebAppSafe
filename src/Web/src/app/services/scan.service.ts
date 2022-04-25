import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ScanService {
  env = environment;
  url = this.env.gate + '/scan';

  constructor(private httpClient: HttpClient) {}

  getAllScans(): Observable<any> {
    return this.httpClient.get(this.url + '/all');
  }

  getScan(id: number): Observable<any> {
    return this.httpClient.get(this.url + '/' + id);
  }

  postScan(scan: any): void {
    this.httpClient.post(this.url + '/add', scan).subscribe();
  }


}
