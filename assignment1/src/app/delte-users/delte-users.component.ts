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

  ngOnInit() {
    this.checkLoadData();
    
    this.getData();
  }

  private getData(){
    this.rootService.getAPIData().subscribe((response)=>{
        this.userArray = response;
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

}
