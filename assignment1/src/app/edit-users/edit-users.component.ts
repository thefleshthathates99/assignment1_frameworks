import { Component, OnInit } from '@angular/core';
import {RootService} from '../services/root.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-edit-users',
  templateUrl: './edit-users.component.html',
  styleUrls: ['./edit-users.component.css']
})
export class EditUsersComponent implements OnInit {

  constructor(private router: Router, private rootService: RootService) { }

  userArray: any;
  displayUsername: any;
  loginCheck: any;
  userStatus: any;
  userName: any;

  newName = '';
  newEmail = '';
  newPassword='';
  newRole: string;

  userEdit: string;
  editRole: string;

  namesArray = [];

  ngOnInit() {
    this.checkLoadData();
    
    this.getData();
  }

  

  private getData(){
    this.rootService.getuserData().subscribe((response)=>{
        this.userArray = response;
        console.log(this.userArray);
        for (let i=0; i < this.userArray.length; i++){
          var nameAdd = this.userArray[i].name
          this.namesArray.push(nameAdd)
        }
        console.log(this.namesArray)
    },(error) => {
        console.log('error is ', error)
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

  private testPost(){
    this.rootService.saveAPIData(this.userArray).subscribe((response)=>{
      console.log(response);
      alert("Changes Saved")
      this.router.navigateByUrl('/chat');
  },(error) => {
      console.log('error is ', error)
  })
  }

  private addUser(){
    var curId = this.userArray.length;
    var newId = curId + 1
    newId = parseInt(newId)
    var newUserInput = {_id: newId, name: this.newName, username: this.newEmail, password: this.newPassword, status: this.newRole}
    this.rootService.addUser(newUserInput).subscribe((data)=>{
      console.log(data);
    })
    console.log(this.userArray);
    alert("User added: " + newUserInput.name)
    }

    private goBack(){
      this.router.navigateByUrl('/chat');
    }

    private editUser(){
      for(let i = 0; i < this.userArray.length; i++){
        if (this.userArray[i].name == this.userEdit){
          
          var editUserInput = this.userArray[i]
          editUserInput.status = this.editRole;
          console.log(editUserInput)
          this.rootService.editUser(editUserInput).subscribe((data)=>{
            console.log(data);
          })
        } 
      }
    }
}
