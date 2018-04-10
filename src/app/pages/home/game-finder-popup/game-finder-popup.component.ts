import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from "@angular/material";
import {GameService} from "@app/core/services/game/game.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-game-finder-popup',
  templateUrl: './game-finder-popup.component.html',
  styleUrls: ['./game-finder-popup.component.scss']
})
export class GameFinderPopupComponent implements OnInit {

  gameFound: boolean;

  constructor(public dialogRef: MatDialogRef<GameFinderPopupComponent>,
              public game: GameService,
              public router: Router) {
  }

  ngOnInit() {
    this.game.findGame().subscribe(room => {
      this.gameFound = true;
      setTimeout(() => {
        this.router.navigate(['/room']);
      }, 300);
    });
  }

  stopFindGame(): void {
    this.dialogRef.close();
  }
}
