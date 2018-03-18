import {Injectable} from '@angular/core';
import {CanActivate, Router} from "@angular/router";
import {UserService} from "@app/core/user/user.service";

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private us: UserService, private router: Router) {
  }

  canActivate() {
    return this.us.isLoggedIn()
      .do(res => {
        if (!res) {
          this.router.navigate(['/login']);
        }
      });

  }
}
