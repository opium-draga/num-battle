import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  userNameFormControl = new FormControl('', [
    Validators.minLength(3),
    Validators.maxLength(15),
    Validators.required,
  ]);

  constructor(private router: Router) {
  }

  searchGame() {
    if (!this.userNameFormControl.valid) {
      return;
    }

    // establish connection, etc.

    this.router.navigate(['/game']);
  }
}
