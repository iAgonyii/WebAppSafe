import {Injectable} from '@angular/core';
import {AngularFireAuth} from "@angular/fire/auth";
import {Router} from "@angular/router";
import {UserService} from "./user.service";
import {Observable} from "rxjs";
import firebase from "firebase";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authState: Observable<firebase.User>
  private currentUser: firebase.User = null;

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private userService: UserService) {

    this.authState = this.afAuth.authState;

    this.authState.subscribe(user => {
        if (user) {
          this.currentUser = user;
          localStorage.setItem('userData', JSON.stringify(user))
          console.log('AUTHSTATE USER', user)
        } else {
          console.log('AUTHSTATE USER EMPTY', user)
          localStorage.removeItem('userData');
          this.currentUser = null;
        }
      },
      err => {
        console.log(err);
      });
  }

  isAuthenticated(): boolean {
    return this.currentUser !== null;
  }

  login(email: string, password: string) {
    this.afAuth.signInWithEmailAndPassword(email, password)
      .then(value => {
        console.log('Nice, it worked!');
        this.router.navigate(['/']);
      })
      .catch(err => {
        console.log('Something went wrong: ', err.message);
      });
  }

  emailSignup(email: string, password: string) {
    this.afAuth.createUserWithEmailAndPassword(email, password)
      .then(value => {
        console.log('Sucess', value);
        this.userService.newUser().subscribe(res => {
          this.router.navigate(['/profile']);
        }, err => {
          console.log(err);
        });
      }).catch(error => {
        console.log('Something went wrong: ', error);
      });
  }

  logout() {
    this.afAuth.signOut().then(() => {
      this.router.navigate(['/']);
    });
  }

  private oAuthLogin(provider) {
    return this.afAuth.signInWithPopup(provider);
  }
}
