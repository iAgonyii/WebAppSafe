import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {interval, Observable, Subscription} from "rxjs";
import {startWith, switchMap, timeInterval} from "rxjs/operators";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  env = environment;
  url = this.env.gate + '/report';

  timeInterval: Subscription;

  constructor(private httpClient: HttpClient, private router: Router) {}

  startPolling(scan) {
    this.timeInterval = interval(5000).pipe(
      startWith(0),
      switchMap(() => this.pollReportByScanId(scan))
    ).subscribe(res => {
      if (res.status === 200) {
        this.timeInterval.unsubscribe();
        this.router.navigate(['/report/' + res.body])
      }
    }, err => {
      console.log(err);
    });
  }

  pollReportByScanId(scan): Observable<any> {
    return this.httpClient.get(this.url + '/poll/' + scan, {observe: 'response'});
  }

  getReport(id: number): Observable<any> {
    return this.httpClient.get(this.url + '/' + id);
  }

  getMyRecentReports(): Observable<any> {
    return this.httpClient.get(this.url + '/authenticated/recent/me');
  }

  getRecentPublicReports(): Observable<any> {
    return this.httpClient.get(this.url + '/recent');
  }
}
