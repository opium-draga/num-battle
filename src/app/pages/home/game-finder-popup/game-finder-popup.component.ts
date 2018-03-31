import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from "@angular/material";
import {GameService} from "@app/core/services/game/game.service";

@Component({
  selector: 'app-game-finder-popup',
  templateUrl: './game-finder-popup.component.html',
  styleUrls: ['./game-finder-popup.component.scss']
})
export class GameFinderPopupComponent implements OnInit {

  gameFound: boolean;

  constructor(public dialogRef: MatDialogRef<GameFinderPopupComponent>,
              public game: GameService) {
  }

  ngOnInit() {
    this.game.findGame().subscribe(() => {
      this.gameFound = true;
    });
  }

  stopFindGame(): void {
    this.dialogRef.close();
  }
}
