import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RootService {

  constructor(private http: HttpClient) { }

  getAPIData(){
      return this.http.get('https://jsonplaceholder.typicode.com/users')//replace with my user data
    }

postAPIData(){
    return this.http.post('/', {'firstName' : 'Code', 'lastName' : 'Handbook'})
  }

}
