import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Lesson } from '../models/lesson';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LessonsService {
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
  // get all topics
  getAllLessons() {
    this.setHttpOptions();
    return this.http.get<Lesson[]>(
      environment.BASE_ADMIN_URL + 'courses',
      this.httpOptions
    );
  }

  // get only one lesson
  getTopic(topicId) {
    this.setHttpOptions();
    return this.http.get(
      environment.BASE_URL + `topics/${topicId}`,
      this.httpOptions
    );
  }

  applyAnswer(courseId, topicId, answer) {
    return this.http.post(
      environment.BASE_URL + `topics/${topicId}/answer`,
      answer,
      this.httpOptions
    );
  }

  editAnswer(answerId, answer) {
    return this.http.put(
      environment.BASE_URL + `answers/${answerId}`,
      answer,
      this.httpOptions
    );
  }

  addNewLesson(lesson) {
    return this.http.post(environment.BASE_ADMIN_URL, lesson, this.httpOptions);
  }

  editLesson(lessonID, lesson) {
    return this.http.put(
      environment.BASE_ADMIN_URL + `topics/${lessonID}`,
      lesson,
      this.httpOptions
    );
  }

  deleteLesson(lesson) {
    return this.http.delete(
      environment.BASE_ADMIN_URL + `topics/${lesson.id}`,
      this.httpOptions
    );
  }
}
