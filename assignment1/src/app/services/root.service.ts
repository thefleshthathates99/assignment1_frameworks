import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RootService {

  constructor(private http: HttpClient) { }

  insertData(): Observable<any> {
    return this.http.get("http://localhost:3000/api/addData");
} 

  getuserData():  Observable<any> {
        return this.http.get("http://localhost:3000/api/getUsers");
    }

  getGroupData():  Observable<any> {
    return this.http.get("http://localhost:3000/api/getGroups");
  }

  addUser(responseData){
    return this.http.post('http://localhost:3000/api/addNewUser', responseData)
  }

  editUser(responseData){
    return this.http.post('http://localhost:3000/api/editUser', responseData)
  }

  deleteUser(responseData){
    return this.http.post('http://localhost:3000/api/deleteUser', responseData)
  }

  deleteGroup(responseData){
    return this.http.post('http://localhost:3000/api/deleteGroup', responseData)
  }
  
  addGroup(responseData){
    return this.http.post('http://localhost:3000/api/addNewGroup', responseData)
  }

  addUsertoChannel(responseData){
    return this.http.post('http://localhost:3000/api/addNewUsertoChannel', responseData)
  }

  updateGroups(responseData){
    return this.http.post('http://localhost:3000/api/updateGroups', responseData)
  }

}
