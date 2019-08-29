import { Component, OnInit } from '@angular/core';
import {RootService} from '../services/root.service';
import { Router } from '@angular/router';
import { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } from 'constants';


@Component({
  selector: 'app-edit-groups',
  templateUrl: './edit-groups.component.html',
  styleUrls: ['./edit-groups.component.css']
})
export class EditGroupsComponent implements OnInit {

  constructor(private router: Router, private rootService: RootService) { }

  userArray: [];
  groupArray: any;

  adminAndSuper = [];
  assistants = [];

  newAdmin: any;
  newName: "";
  namesArray =  [];

  channelToAddUser: any;
  userChannelAdd: any;

  assisGroupAdd: any;
  groupToAddAssis: any;

  newChannelName: any;
  groupToAddChannel: any;

  channelsArray = [];

  ngOnInit() {
    this.getData();

  }



  private goBack(){
    this.router.navigateByUrl('/chat');
  }

  private getData(){
    this.rootService.getAPIData().subscribe((response)=>{
        this.userArray = response.responseData ;
        console.log(this.userArray);
    },(error) => {
        console.log('error is ', error)
    })

    this.rootService.getGroupData().subscribe((response)=>{
      this.groupArray = response.responseData;
      console.log(this.groupArray);
      for(let i = 0; i < this.groupArray.length; i++){
        this.channelsArray.push(this.groupArray[i].groupChannels[0])
      }
      console.log(this.channelsArray)
      for (let i=0; i < this.userArray.userList.length; i++){
        var nameAdd = this.userArray.userList[i].name
        this.namesArray.push(nameAdd)
      }
      console.log(this.namesArray)
      for (let i=0; i < this.userArray.userList.length; i++){
        if(this.userArray.userList[i].status == "super" || this.userArray.userList[i].status == "group admin"){
            this.adminAndSuper.push(this.userArray.userList[i].name)
        }
      }
      console.log(this.adminAndSuper)
      for (let i=0; i < this.userArray.userList.length; i++){
        if(this.userArray.userList[i].status == "group assist"){
            this.assistants.push(this.userArray.userList[i].name)
        }
      }
      console.log(this.assistants)
  },(error) => {
      console.log('error is ', error)
  })

  }

  private testPost(){
    this.rootService.saveAPIGroupData(this.groupArray).subscribe((response)=>{
      console.log(response);
      alert("Changes Saved")
      this.router.navigateByUrl('/chat');
  },(error) => {
      console.log('error is ', error)
  })
  }

  private addGroup(){
    var toAddGroup = {"groupName": this.newName,"groupAdmin": this.newAdmin,"groupAssists":[],"groupChannels": []}
    console.log(toAddGroup)
    this.groupArray.push(toAddGroup)
    console.log(this.groupArray)
  }

  private addUserToChannel(){
    var userFound = "false"
    var userToAdd = "";
    for(let i = 0; i < this.channelsArray.length; i++){
      if(this.channelToAddUser == this.channelsArray[i].ChannelName){
        for(let jj = 0; jj < this.channelsArray[i].ChannelUsers.length; jj++){
          if(this.channelsArray[i].ChannelUsers[jj] == this.userChannelAdd){
            userFound = "true";
            alert("User already exists on Channel")
          }
        }
        if(userFound == "false"){
          //this.groupArray[i].groupChannels[jj].ChannelUsers.push(userToAdd)
          this.groupArray[i].groupChannels[0].ChannelUsers.push(this.userChannelAdd)
          console.log(this.groupArray[i])
        }
      }
    }

  }

  private addAssistantToGroup(){
    var userFound = "false"
    for(let i = 0; i < this.groupArray.length; i++){
      if(this.groupToAddAssis == this.groupArray[i].groupName){
        for(let jj = 0; jj < this.groupArray[i].groupAssists.length; jj++){
          if(this.assisGroupAdd == this.groupArray[i].groupAssists[jj]){
            alert("Already exists in group")
            userFound = "true";
          } 
        }
        if(userFound == "false"){
          this.groupArray[i].groupAssists.push(this.assisGroupAdd)
          console.log(this.groupArray[i])
        }
      }
    }
  }

  private addChannelToGroup(){
    var channelFound = "false"
    for(let i = 0; i < this.groupArray.length; i++){
      if(this.groupToAddChannel == this.groupArray[i].groupName){
        for(let jj = 0; jj < this.groupArray[i].groupChannels.length; jj++){
          if(this.newChannelName == this.groupArray[i].groupChannels[jj]){
            alert("Already exists in group")
            channelFound = "true";
          } 
        }
        if(channelFound == "false"){
          this.groupArray[i].groupChannels.push(
            {"ChannelName": this.newChannelName, "ChannelUsers": [] }
          )
          console.log(this.groupArray[i])
        }
      }
    }
  }
}
