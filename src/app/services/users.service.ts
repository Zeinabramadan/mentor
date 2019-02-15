import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  public user = JSON.parse(localStorage.getItem('user'));
  public token = this.user['accessToken'];
  public usersAPI = 'https://hasanzohdy.com/mentor/back/public/api/admin/users';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.token
    })
  };

  constructor(private http: HttpClient) {}

  // get all users
  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.usersAPI, this.httpOptions);
  }

  addNewUser(user) {
    return this.http.post(this.usersAPI, user, this.httpOptions);
  }

  deleteUser(user) {
    return this.http.delete(this.usersAPI + `/${user.id}`, this.httpOptions);
  }

  editUser(userId, user) {
    return this.http.put(this.usersAPI + `/${userId}`, user, this.httpOptions);
  }
}
