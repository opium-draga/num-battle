import {Component, OnInit} from '@angular/core';
import {UserService} from "@app/core/services/user/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(protected us: UserService, protected router: Router) {
  }

  ngOnInit() {
  }

  loginFacebook() {
    this.us.loginFacebook()
      .then((res) => {
        console.log(res);
          this.router.navigate(['/']);
      }, () => {
        alert('something went wrong')
      });
  }

  loginGoogle() {

  }
}
