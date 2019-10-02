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
    this.rootService.getuserData().subscribe((response)=>{    //Get userData from DB. Mostly used for admin purposes
        console.log('response is ', response)
        this.userData = response;
    },(error) => {
        console.log('error is ', error)
    })

  }

  public login(){
    sessionStorage.clear();
    var loginCheck = "false";
    console.log(this.username + " " + this.password)
    for (let i=0; i < this.userData.length; i++){
      //console.log(this.userData.userList[i].name);
      if(this.username == this.userData[i].username && this.password == this.userData[i].password){     //Checks login credentials against userData array
        console.log("Success!");
        loginCheck = "true"
        sessionStorage.setItem("status", this.userData[i].status)
        sessionStorage.setItem("name", this.userData[i].name)
        sessionStorage.setItem("username", this.username);
        sessionStorage.setItem("logCheck", "true");
        break;
      } else {
        
      
      }
      
    }
    if(loginCheck == "true"){
      this.router.navigateByUrl('/chat');
    } else {                                                  //If correct, login, change address. Else, alert about the incorrect login
      alert("Incorrect Email or Password, please try again")
    }
    
    
  }


}
