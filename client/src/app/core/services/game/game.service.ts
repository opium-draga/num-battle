import {Injectable} from '@angular/core';
import * as io from 'socket.io-client';
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Observable} from "rxjs/Observable";
import {Subject} from "rxjs/Subject";
import {UserService} from "@app/core/services/user/user.service";

@Injectable()
export class GameService {
  usersAmount = new BehaviorSubject<number>(0);
  queueAmount = new BehaviorSubject<number>(0);

  private url = 'http://localhost:3000';
  private socket;

  private findResult: Subject<any> = new Subject();

  constructor(public userService: UserService) {
    // let user = JSON.stringify(userService.user);
    //
    // this.socket = io(this.url, {query: `user=${user}`});
    // this.setEventHandlers();
  }

  /**
   * Send event findGame
   * @returns {Observable<boolean>}
   */
  public findGame() {
    this.socket.emit('findGame');
    return this.findResult;
  }

  /**
   * Send event stopFindGame
   */
  public stopFindGame() {
    this.socket.emit('stopFindGame');
  }

  /**
   * Event handlers declaration
   */
  private setEventHandlers() {
    this.socket.on('userAmountUpdate', res => {
      this.usersAmount.next(res.activeUsersAmount);
    });

    this.socket.on('queueUpdate', res => {
      this.queueAmount.next(res.queueAmount);
    });

    this.socket.on('gameFound', data => {
      this.findResult.next(data);
    });
  }
}
