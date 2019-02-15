import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AnswersService {
  public user;
  public token;
  public httpOptions;

  constructor(private http: HttpClient) {}

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
  getAnswers() {
    this.setHttpOptions();
    return this.http.get(
      environment.BASE_URL + 'answers/pending',
      this.httpOptions
    );
  }

  changeStatus(answerID, answer) {
    return this.http.put(
      environment.BASE_URL + `answers/pending/${answerID}`,
      answer,
      this.httpOptions
    );
  }
}
