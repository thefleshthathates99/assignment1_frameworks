import { Component, OnInit } from '@angular/core';
import {SocketService} from '../services/socket.service';
import {RootService} from '../services/root.service';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  messagecontent: string="";
  messages: string[]= [];
  ioConnection: any;

  displayUsername: any;
  loginCheck: any;
  userStatus: any;
  userName: any;
  userArray: any;

  displayName: "";

  constructor(private socketService: SocketService, private router: Router, private rootService: RootService) { }

  ngOnInit() {
    this.initIoConnection();

    this.checkLoadData();

    this.getData();

    this.callData();

    if(this.userName != null){
        this.displayName = this.userName;
    } else {
      this.displayName = this.displayUsername;
    }

    if(this.userStatus == null){
      this.userStatus = "User";
    }
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
    this.callData();
  }

  private getData(){
    this.rootService.getAPIData().subscribe((response)=>{
        this.userArray = response;
        console.log(this.userArray);
    },(error) => {
        console.log('error is ', error)
    })
  }

  private callData(){
    this.rootService.postAPIData(this.messages).subscribe((response)=>{
          console.log('response from post data is ', response);
        },(error)=>{
          console.log('error during post is ', error)
        })
  }

  private checkLoadData(){
    console.log(sessionStorage.getItem("username"))
    console.log(sessionStorage.getItem("logCheck"))
    console.log(sessionStorage.getItem("status"))
    console.log(sessionStorage.getItem("name"))

    this.displayUsername = sessionStorage.getItem("username");
    this.loginCheck = sessionStorage.getItem("logCheck");
    this.userStatus = sessionStorage.getItem("status");
    this.userName = sessionStorage.getItem("name");
  }

  private logout(){
    sessionStorage.clear();
    this.router.navigateByUrl('/');
  }

  private goToAddEdit(){
    this.router.navigateByUrl('/editUsers');
  }

  private goToDelete(){
    this.router.navigateByUrl('/deleteUsers');
  }


}
