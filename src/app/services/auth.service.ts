import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `key ${environment.AUTH_KEY}`
    })
  };
  public userToken: string;
  public accType: string;

  constructor(private http: HttpClient, private router: Router) {}

  loginUser(user) {
    return this.http.post(
      environment.BASE_URL + 'login',
      user,
      this.httpOptions
    );
  }

  register(user) {
    return this.http.post(
      environment.BASE_URL + '/register',
      user,
      this.httpOptions
    );
  }

  isLoggedIn() {
    if (localStorage.getItem('user')) {
      this.userToken = JSON.parse(localStorage.getItem('user')).accessToken;
      if (this.userToken) {
        return !!this.userToken;
      } else {
        this.router.navigate(['/login']);
      }
    }
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
