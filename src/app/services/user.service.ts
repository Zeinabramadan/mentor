import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public user;
  public token;
  public httpOptions;

  constructor(private http: HttpClient) {}

  userInfo() {
    this.setHttpOptions();
    return this.http.get(environment.BASE_URL + 'me', this.httpOptions);
  }

  currentUserAnswers() {
    this.setHttpOptions();
    return this.http.get(environment.BASE_URL + 'me/answers', this.httpOptions);
  }

  setHttpOptions() {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.token = this.user['accessToken'];
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.token
      })
    };
  }
}
