import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import {BehaviorSubject} from "rxjs/BehaviorSubject";

@Injectable()
export class GameService {

  usersAmount = new BehaviorSubject<number>(0);

  private url = 'http://localhost:3000';
  private socket;

  constructor() {
    let user = JSON.stringify({
      name: 'Yaroslav',
      email: 'yaroslav'
    });

    this.socket = io(this.url, { query: `user=${user}`});

    this.socket.on('userAmountUpdate', (usersAmount) => {
      this.usersAmount.next(usersAmount.activeUsersAmount);
    })
  }
}
