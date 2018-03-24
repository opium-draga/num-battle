import {Injectable} from '@angular/core';
import {AngularFireAuth} from "angularfire2/auth/auth";
import * as firebase from 'firebase/app';
import {Router} from "@angular/router";
import {Observable} from "rxjs/Observable";

@Injectable()
export class UserService {

  public userDetails: firebase.User = null;

  constructor(private fireAuth: AngularFireAuth, private router: Router) {
    this.fireAuth.authState.subscribe(user => {
        this.userDetails = user || null;
      }
    );
  }

  isLoggedIn(): Observable<boolean> {
    return this.fireAuth.authState.map(user => !!user);
  }

  loginGoogle() {
    return this.fireAuth.auth.signInWithPopup(
      new firebase.auth.FacebookAuthProvider()
    )
  }

  loginFacebook() {
    return this.fireAuth.auth.signInWithPopup(
      new firebase.auth.FacebookAuthProvider()
    );
  }

  logout() {
    this.fireAuth.auth.signOut()
      .then(res => this.router.navigate(['/login']));
  }
}
