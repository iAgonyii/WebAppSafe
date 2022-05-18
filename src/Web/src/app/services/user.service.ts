import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  env = environment;
  url = this.env.gate + '/user';

  constructor(private httpClient: HttpClient) {
  }

  newUser(): Observable<any> {
    return this.httpClient.post(this.url + '/authenticated/add', {observe: 'response'});
  }

}
