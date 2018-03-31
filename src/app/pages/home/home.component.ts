import { Component, OnInit } from '@angular/core';
import {GameService} from "@app/core/services/game/game.service";
import {MatDialog} from "@angular/material";
import {GameFinderPopupComponent} from "@app/pages/home/game-finder-popup/game-finder-popup.component";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  usersAmount = 0;

  constructor(public game: GameService,
              public dialog: MatDialog) { }

  ngOnInit() {
    this.game.usersAmount
      .subscribe(usersAmount => this.usersAmount = usersAmount);
  }

  openFindGamePopup() {
    let dialogRef = this.dialog.open(GameFinderPopupComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.game.stopFindGame();
    });
  }
}
