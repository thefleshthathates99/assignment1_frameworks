import { Component, OnInit } from '@angular/core';
import {SocketService} from '../services/socket.service';
import {RootService} from '../services/root.service';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  messagecontent: string="";
  messages: string[]= [];
  ioConnection: any;

  constructor(private socketService: SocketService, private rootService: RootService) { }

  ngOnInit() {
    this.initIoConnection();

    this.getData();

    this.callData();
  }

  private initIoConnection(){
    this.socketService.initSocket();
    this.ioConnection = this.socketService.onMessage()
      .subscribe((message:string) => {
        this.messages.push(message);
      });
  }

  private chat(){
    if(this.messagecontent){
      this.socketService.send(this.messagecontent);
      this.messagecontent = null;
    }else{
      console.log("no message");
    }
  }

  private getData(){
    this.rootService.getAPIData().subscribe((response)=>{
        console.log('response is ', response)
    },(error) => {
        console.log('error is ', error)
    })
  }

  private callData(){
    this.rootService.postAPIData().subscribe((response)=>{
          console.log('response from post data is ', response);
        },(error)=>{
          console.log('error during post is ', error)
        })
  }


}
