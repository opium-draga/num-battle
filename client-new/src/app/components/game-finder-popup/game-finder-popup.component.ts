import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {GameService} from '../../services/game.service';

@Component({
  selector: 'app-game-finder-popup',
  templateUrl: './game-finder-popup.component.html',
  styleUrls: ['./game-finder-popup.component.scss']
})
export class GameFinderPopupComponent implements OnInit {
  searchResult: boolean;
  connectionError: boolean;

  constructor(public dialogRef: MatDialogRef<GameFinderPopupComponent>,
              public gameService: GameService) {
  }

  ngOnInit() {
    this.gameService.startSearch().subscribe(result => {
      this.searchResult = !!result;

      let t = 0;
      if (result) {
        t = 3000;
      }

      this.closeDialog(result, t);
    });

    this.gameService.connectionError.subscribe(() => {
      this.connectionError = true;
      this.closeDialog(null, 3000);
    });
  }

  stopSearch() {
    this.gameService.stopSearch();
  }

  closeDialog(result, timeout) {
    setTimeout(() => {
      this.dialogRef.close(result);
    }, timeout);
  }
}
