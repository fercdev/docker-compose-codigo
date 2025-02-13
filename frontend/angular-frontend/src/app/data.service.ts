import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private apiUrl = 'http://143.244.201.163/api/users'

  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get(this.apiUrl);
  }

  addUser(user: {firstName: string, lastName:string, age: number}) {
    return this.http.post(this.apiUrl, user);
  }
}
