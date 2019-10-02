import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RootService {

  constructor(private http: HttpClient) { }

  insertData(): Observable<any> {
    return this.http.get("http://localhost:3000/api/addData");//Admin route - Adds data without calling Mongo
} 

  getuserData():  Observable<any> {
      return this.http.get("http://localhost:3000/api/getUsers");//Calls getUserDataRoute
    }

  getGroupData():  Observable<any> {
    return this.http.get("http://localhost:3000/api/getGroups");//Calls getGroupDataRoute
  }

  addUser(responseData){
    return this.http.post('http://localhost:3000/api/addNewUser', responseData)//Calls addUser Route
  }

  editUser(responseData){
    return this.http.post('http://localhost:3000/api/editUser', responseData)//Calls editUser Route
  }

  deleteUser(responseData){
    return this.http.post('http://localhost:3000/api/deleteUser', responseData)//Calls deleteUser Route
  }

  deleteGroup(responseData){
    return this.http.post('http://localhost:3000/api/deleteGroup', responseData)//Calls deleteGroup Route
  }
  
  addGroup(responseData){
    return this.http.post('http://localhost:3000/api/addNewGroup', responseData)//Calls addGroup Route
  }

  addUsertoChannel(responseData){
    return this.http.post('http://localhost:3000/api/addNewUsertoChannel', responseData)//Calls addUsertoChannel Route
  }

  updateGroups(responseData){
    return this.http.post('http://localhost:3000/api/updateGroups', responseData)//Calls updateGroups Route
  }

}
