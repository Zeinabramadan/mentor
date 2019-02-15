import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'key SP6YHG56IKLO90MNF4TGAQW23FVBG765'
    })
  };
  public userToken: string;
  public accType: string;

  constructor(private http: HttpClient, private router: Router) {}

  public endPoint = 'https://hasanzohdy.com/mentor/back/public/api';

  loginUser(user) {
    return this.http.post(this.endPoint + '/login', user, this.httpOptions);
  }

  register(user) {
    return this.http.post(this.endPoint + '/register', user, this.httpOptions);
  }

  isLoggedIn() {
    this.userToken = JSON.parse(localStorage.getItem('user')).accessToken;
    return !!this.userToken;
  }

  logOutUser() {
    localStorage.removeItem('user');
  }

  isAdmin() {
    this.accType = JSON.parse(localStorage.getItem('user')).accountType;
    if (this.accType === 'admin') {
      return true;
    }
    return false;
  }
}
