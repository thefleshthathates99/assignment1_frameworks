import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RootService {

  constructor(private http: HttpClient) { }

  getAPIData():  Observable<any> {
        return this.http.get("./server/data/users.json");
    }

postAPIData(responseData){
    return this.http.post('http://localhost:3000/postData', {'response': responseData})
  }

  saveAPIData(responseData){
    return this.http.post('http://localhost:3000/saveData', {responseData})
  }
}
