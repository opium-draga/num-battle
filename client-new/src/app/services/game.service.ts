import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {UserService} from './user.service';
import * as io from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  public findResult: Subject<any> = new Subject();
  public connectionError: Subject<boolean> = new Subject();

  private url = 'http://localhost:3000/';
  private socket;

  constructor(public userService: UserService) {
  }

  /**
   * Establish socket connection
   */
  socketConnect() {
    this.socket = io(this.url, {
      query: `name=${this.userService.name}`,
      transports: ['websocket']
    });

    this.setEventHandlers();

    return this.socket;
  }

  socketDisconnect() {
    if (this.socket) {
      this.socket.close();
    }
  }

  /**
   * Connect and emit startSearch event
   */
  public startSearch() {
    this.socketConnect().on('connect', () => {
      this.socket.emit('startSearch');
    });

    return this.findResult;
  }

  /**
   * Send event stopSearch
   */
  public stopSearch() {
    this.socket.emit('stopSearch');
    this.findResult.next(null);
  }

  /**
   * Event handlers declaration
   */
  private setEventHandlers() {
    this.socket.on('gameFound', res => {
      this.findResult.next(res);
    });

    this.socket.on('reconnect_attempt', () => {
      this.socket.io.opts.transports = ['polling', 'websocket'];
    });

    this.socket.on('reconnect_error', () => {
      this.socket.close();
      this.connectionError.next(true);
    });
  }
}
