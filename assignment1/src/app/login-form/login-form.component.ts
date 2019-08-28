import { Component, OnInit } from '@angular/core';
import {RootService} from '../services/root.service';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  username = "";
  password = "";

  constructor(private rootService: RootService, private router: Router) { }

  ngOnInit() {
    this.getData();

    console.log(sessionStorage);
  }

  public userData: any;

  private getData(){
    this.rootService.getAPIData().subscribe((response)=>{
        console.log('response is ', response)
        this.userData = response;
        console.log(this.userData);
    },(error) => {
        console.log('error is ', error)
    })
  }

  public login(){
    sessionStorage.clear();
    console.log(this.username + " " + this.password)
    for (let i=0; i < this.userData.userList.length; i++){
      //console.log(this.userData.userList[i].name);
      if(this.username == this.userData.userList[i].username && this.password == this.userData.userList[i].password){
        console.log("Success!");
        sessionStorage.setItem("status", this.userData.userList[i].status)
        sessionStorage.setItem("name", this.userData.userList[i].name)
        sessionStorage.setItem("username", this.username);
        sessionStorage.setItem("logCheck", "true");
        break;
      } else {
        console.log("Not registered");
        sessionStorage.setItem("username", this.username);
        sessionStorage.setItem("logCheck", "true");
      
      }
      
    }
    this.router.navigateByUrl('/chat');
    
  }


}
