import {Injectable} from '@angular/core';
import * as firebase from 'firebase/app';
import {Router} from "@angular/router";
import {Observable} from "rxjs/Observable";

@Injectable()
export class UserService {

  // TODO: describe model
  public user;

  private fbUser: firebase.User = null;

  constructor(private router: Router) {
  }

  isLoggedIn(): Observable<boolean> {
    return Observable.of(true);
  }

  logout() {
    this.router.navigate(['/login']);
  }
}
