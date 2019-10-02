import { Component, OnInit } from '@angular/core';
import {RootService} from '../services/root.service';
import { Router } from '@angular/router';
//import { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } from 'constants';


@Component({
  selector: 'app-edit-groups',
  templateUrl: './edit-groups.component.html',
  styleUrls: ['./edit-groups.component.css']
})
export class EditGroupsComponent implements OnInit {

  constructor(private router: Router, private rootService: RootService) { }

  userArray = [];
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

  userStatus: any;
  deleteChannelName: any;

  userToBeRemoved: any;
  
  username: any;
  groupsWithCurAssist = [];

  groupToDelete: any;

  ngOnInit() {

    this.loadUserStatus();

    this.getData();

  }



  private goBack(){
    this.router.navigateByUrl('/chat');
  }

  private getData(){
    this.rootService.getuserData().subscribe((response)=>{
        this.userArray = response;
        console.log(this.userArray);
    },(error) => {
        console.log('error is ', error)
    })

    this.rootService.getGroupData().subscribe((response)=>{
      this.groupArray = response;
      console.log(this.groupArray);
      for(let i = 0; i < this.groupArray.length; i++){
        this.channelsArray.push(this.groupArray[i].groupChannels[0])
        console.log(this.groupArray[i].groupChannels[0])
      }
      console.log(this.channelsArray)
      for (let i=0; i < this.userArray.length; i++){
        var nameAdd = this.userArray[i].name
        this.namesArray.push(nameAdd)                                                   //Sorts data into necessary array for execution
      }
      console.log(this.namesArray)
      for (let i=0; i < this.userArray.length; i++){
        if(this.userArray[i].status == "super" || this.userArray[i].status == "group admin"){
            this.adminAndSuper.push(this.userArray[i].name)
        }
      }
      console.log(this.adminAndSuper)
      for (let i=0; i < this.userArray.length; i++){
        if(this.userArray[i].status == "group assist"){
            this.assistants.push(this.userArray[i].name)
        }
      }
      console.log(this.assistants)
      if(this.userStatus == "group assist"){
        this.groupFindAssist();
      }

  },(error) => {
      console.log('error is ', error)
  })

  }

  private addGroup(){
    var curId = this.groupArray.length;
    var newId = curId + 1
    newId = parseInt(newId)
    var toAddGroup = {"_id": newId, "groupName": this.newName,"groupAdmin": this.newAdmin,"groupAssists":[],"groupChannels": [{ChannelName: "NewChannel", ChannelUsers: [], ChannelChat: []}]}
    console.log(toAddGroup)
    this.rootService.addGroup(toAddGroup).subscribe((data)=>{     //Calls the addGroup route in rootService, adding a group
      console.log(data)
    })
    window.location.reload();
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
          this.groupArray[i].groupChannels[0].ChannelUsers.push(this.userChannelAdd)
          console.log(this.groupArray[i])
          this.rootService.addUsertoChannel(this.groupArray[i]).subscribe((data)=>{       //Calls the addUsertoChannel route in the rootService
            console.log(data)
          })
        }
      }
    }
    window.location.reload();
  }

  private addAssistantToGroup(){
    var userFound = "false"
    console.log(this.groupArray)
    console.log(this.assistants)
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
          this.rootService.updateGroups(this.groupArray[i]).subscribe((data)=>{       //Update groups, adding the newly made assistants
            console.log(data);
          })
        }
      }
    }
    window.location.reload();
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
          this.rootService.updateGroups(this.groupArray[i]).subscribe((data)=>{     //Adds channel to group, calling the updateGroups route
            console.log(data);
          })
        }
      }
    }
    window.location.reload();
  }
  
  private loadUserStatus(){
    this.userStatus = sessionStorage.getItem("status");
    this.username = sessionStorage.getItem('name')
                                                        //Load user data
    console.log(this.userStatus)
    console.log(this.username)
  }

  private deleteChannel(){
    for(let i = 0; i < this.groupArray.length; i++){
      for(let jj = 0; jj < this.groupArray[i].groupChannels.length; jj++){
        if(this.groupArray[i].groupChannels[jj].ChannelName == this.deleteChannelName){
          console.log(this.groupArray[i].groupChannels[jj])
          this.groupArray[i].groupChannels.splice(jj, 1);
          alert("Channel " + this.groupArray[i].groupChannels[jj].name + " has been deleted")
          this.rootService.updateGroups(this.groupArray[i]).subscribe((data)=>{               //Update groups with the newly deleted channel
            console.log(data);
          })
          console.log(this.groupArray[i]) 
        }
      }
    }

  }

  private groupFindAssist(){
    for(let i = 0; i < this.groupArray.length; i++){
      for(let jj = 0; jj < this.groupArray[i].groupAssists.length; jj++){
        if(this.groupArray[i].groupAssists[jj] == this.username){
          this.groupsWithCurAssist.push(this.groupArray[i])
        }
      }
    }
    console.log(this.groupsWithCurAssist)
    this.channelsArray = [];
    for(let i = 0; i < this.groupsWithCurAssist.length; i++){
      this.channelsArray.push(this.groupsWithCurAssist[i].groupChannels[0])
    }
    console.log(this.channelsArray)
  }

  private deleteGroup(){
    alert("Group Deleted: " + this.groupToDelete)
    for(let i = 0; i < this.groupArray.length; i++){
      if(this.groupArray[i].groupName == this.groupToDelete){
        this.rootService.deleteGroup(this.groupArray[i]).subscribe((data)=>{    //Delete group, calling the deleteGroup rootService
          console.log(data);
        })
      }
    }
    console.log(this.groupArray)
    window.location.reload();
  }


}
