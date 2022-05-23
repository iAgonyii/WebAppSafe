import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {AngularFireAuth} from "@angular/fire/auth";
import {Observable} from "rxjs";
import {switchMap, take} from "rxjs/operators";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private auth: AngularFireAuth) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return this.auth.idToken.pipe(
      take(1), // <-------------- Only emit the first value!

      switchMap((token: any) => {
        if (token) {
          request = request.clone({
            setHeaders: { Authorization: `Bearer ${token}` }
          });
        }
        return next.handle(request);
      })

    );
  }
}
