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
  groupArray: any;
  channelsArray = [];

  displayName: "";

  channelsDivider: any;

  constructor(private socketService: SocketService, private router: Router, private rootService: RootService) { }

  ngOnInit() {
    this.initIoConnection();

    this.getData();

    this.checkLoadData();

    this.callData();

    if(this.userName != null){
        this.displayName = this.userName;
    } else {
      this.displayName = this.displayUsername;
    }

    if(this.userStatus == null){
      this.userStatus = "user";
    }
  }

  private initIoConnection(){
    this.socketService.initSocket();
    this.ioConnection = this.socketService.onMessage()  //Initialise socket connection, pushing messages if they exist
      .subscribe((message:string) => {
        this.messages.push(message);
      });
  }

  private chat(){
    if(this.messagecontent){
      this.socketService.send(this.messagecontent);
      this.messagecontent = null;                   //Sends message and update message on page
    }else{
      console.log("no message");
    }
  }

  private getData(){
    this.rootService.getuserData().subscribe((response)=>{
        this.userArray = response;
        console.log(this.userArray);                        //Get data from the database, calling the getGroup/getUser data
    },(error) => {
        console.log('error is ', error)
    })

    this.rootService.getGroupData().subscribe((response)=>{
      this.groupArray = response;
      console.log(this.groupArray);
  })

  }

  private checkLoadData(){
    console.log(sessionStorage.getItem("username"))
    console.log(sessionStorage.getItem("logCheck"))
    console.log(sessionStorage.getItem("status"))
    console.log(sessionStorage.getItem("name"))
                                                                //Load data from sessionStorage
    this.displayUsername = sessionStorage.getItem("username");
    this.loginCheck = sessionStorage.getItem("logCheck");
    this.userStatus = sessionStorage.getItem("status");
    this.userName = sessionStorage.getItem("name");
  }

  private logout(){
    sessionStorage.clear();
    this.router.navigateByUrl('/');                             //Clear data from sessionStorage and return to home
  }
                                                ////////
  private goToAddEdit(){                              //
    this.router.navigateByUrl('/editUsers');          //
  }                                                   //
                                                      //
  private goToGroupEdit(){                            //
    this.router.navigateByUrl('/editGroups');         //
  }                                                   //
                                                      //          Literal routes for Navigation
  private goToDelete(){                               //
    this.router.navigateByUrl('/deleteUsers');        //
  }                                                   //
  private goToGroup(){                                //
    this.router.navigateByUrl('/editGroups');         //
  }                                                   //
                                                ////////
}
