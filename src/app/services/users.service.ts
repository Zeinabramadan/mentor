import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  public user = JSON.parse(localStorage.getItem('user'));
  public token = this.user['accessToken'];
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.token
    })
  };

  constructor(private http: HttpClient) {}

  // get all users
  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(
      environment.BASE_ADMIN_URL + 'users',
      this.httpOptions
    );
  }

  addNewUser(user) {
    return this.http.post(
      environment.BASE_ADMIN_URL + 'users',
      user,
      this.httpOptions
    );
  }

  deleteUser(user) {
    return this.http.delete(
      environment.BASE_ADMIN_URL + `users/${user.id}`,
      this.httpOptions
    );
  }

  editUser(userId, user) {
    return this.http.put(
      environment.BASE_ADMIN_URL + `users/${userId}`,
      user,
      this.httpOptions
    );
  }
}
