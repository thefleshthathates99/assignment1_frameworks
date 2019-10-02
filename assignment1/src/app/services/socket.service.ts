import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as io from 'socket.io-client';

const SERVER_URL = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})

export class SocketService {
  private socket;
  constructor() { }

  public initSocket(): void {
    this.socket = io(SERVER_URL); //Initialise Socket.Io on the Server (Localhost:3000)
  }

  public send(message: string): void {
    this.socket.emit('message', message); //Sends message to socket room
  }

  public onMessage(): Observable<any> {
    let observable = new Observable(observer=>{
      this.socket.on('message', (data:string) => observer.next(data)); //Returns current messages
    });
    return observable;
  }

}
