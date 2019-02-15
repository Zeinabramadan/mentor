import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AnswersService {
  public user;
  public token;
  public httpOptions;

  public answersApi = 'https://hasanzohdy.com/mentor/back/public/api/answers/';

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
    return this.http.get(this.answersApi + 'pending', this.httpOptions);
  }

  changeStatus(answerID, answer) {
    return this.http.put(
      this.answersApi + `pending/${answerID}`,
      answer,
      this.httpOptions
    );
  }
}
