import { Component, OnInit } from '@angular/core';
import {RootService} from '../services/root.service';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  constructor(private rootService: RootService) { }

  ngOnInit() {
    this.getData();

  }

  public userData = '';

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
    for (let i=0; i < 25; i++){
      console.log(this.userData.userList[i]);
    }
    
  }


}
