import {Injectable} from '@angular/core';
import {CookieService} from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _name: string;

  constructor(private cookie: CookieService) {
  }

  set name(name: string) {
    this._name = name;
    this.cookie.set('userName', name);
  }

  get name() {
    const name = this.cookie.get('userName');
    if (name) {
      this._name = name;
    }
    return this._name;
  }

  cleanUp() {
    this.cookie.delete('userName');
  }
}
