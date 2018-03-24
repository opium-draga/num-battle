import { Component, OnInit } from '@angular/core';
import {GameService} from "@app/core/services/game/game.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  usersAmount = 0;

  constructor(public game: GameService) { }

  ngOnInit() {
    this.game.usersAmount.subscribe(usersAmount => this.usersAmount = usersAmount);
  }

}
