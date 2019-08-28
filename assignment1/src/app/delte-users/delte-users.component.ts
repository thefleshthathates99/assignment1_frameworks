import { Component, OnInit } from '@angular/core';
import {RootService} from '../services/root.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delte-users',
  templateUrl: './delte-users.component.html',
  styleUrls: ['./delte-users.component.css']
})
export class DelteUsersComponent implements OnInit {

  constructor(private router: Router, private rootService: RootService) { }

  userArray: "";
  displayUsername: any;
  loginCheck: any;
  userStatus: any;
  userName: any;

  deleteId: any;

  ngOnInit() {
    this.checkLoadData();
    
    this.getData();
  }

  private getData(){
    this.rootService.getAPIData().subscribe((response)=>{
        this.userArray = response.responseData ;
        console.log(this.userArray);
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

  private goBack(){
    this.router.navigateByUrl('/chat');
  }

  private deleteUser(){
    for(let i = 0; i < this.userArray.userList.length; i++){
      var toBeDeleted = parseInt(this.deleteId)
      if (this.userArray.userList[i].id == toBeDeleted){
        var deleting = this.userArray.userList.indexOf(this.userArray.userList[i])
        console.log(deleting)
        alert("User deleted: " + this.userArray.userList[deleting].name)
        this.userArray.userList.splice(deleting, 1);
        console.log(this.userArray)
        
        break;
      } 
    }
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

}
