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

  userArray: any;
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
    this.rootService.getuserData().subscribe((response)=>{
        this.userArray = response ;
        console.log(this.userArray);                        //Get data from the database
    },(error) => {
        console.log('error is ', error)
    })
  }

  private checkLoadData(){
    console.log(sessionStorage.getItem("username"))
    console.log(sessionStorage.getItem("logCheck"))
    console.log(sessionStorage.getItem("status"))
    console.log(sessionStorage.getItem("name"))
                                                              //Check current sessionStorage and load into variables
    this.displayUsername = sessionStorage.getItem("username");
    this.loginCheck = sessionStorage.getItem("logCheck");
    this.userStatus = sessionStorage.getItem("status");
    this.userName = sessionStorage.getItem("name");
  }

  private goBack(){
    this.router.navigateByUrl('/chat');
  }

  private deleteUser(){
    for(let i = 0; i < this.userArray.length; i++){
      var toBeDeleted = parseInt(this.deleteId)
      if (this.userArray[i]._id == toBeDeleted){
        this.rootService.deleteUser(this.userArray[i]).subscribe((data)=>{ //Call the rootService deleteUser route, deleting a user
          console.log(data);
        })
        break;
      } 
    }
  }

}
