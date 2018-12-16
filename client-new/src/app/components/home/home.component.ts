import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {FormControl, Validators} from '@angular/forms';
import {GameService} from '../../services/game.service';
import {MatDialog} from '@angular/material';
import {GameFinderPopupComponent} from '../game-finder-popup/game-finder-popup.component';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  userNameFormControl = new FormControl('', [
    Validators.minLength(3),
    Validators.maxLength(15),
    Validators.required,
  ]);

  constructor(private router: Router,
              private dialog: MatDialog,
              private gameService: GameService,
              private userService: UserService) {
    if (userService.name) {
      this.userNameFormControl.setValue(userService.name);
    }
  }

  searchGame() {
    if (!this.userNameFormControl.valid) {
      return;
    }

    this.userNameFormControl.disable();
    this.userService.name = this.userNameFormControl.value;

    this.gameService.socketDisconnect();

    this.openFindGamePopup();
  }

  openFindGamePopup() {
    const dialogRef = this.dialog.open(GameFinderPopupComponent, {
      width: '350px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.router.navigate(['/room']);
      } else {
        this.userNameFormControl.enable();
      }
    });
  }
}
