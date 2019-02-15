import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Lesson } from '../models/lesson';

@Injectable({
  providedIn: 'root'
})
export class LessonsService {
  public user;
  public token;
  public httpOptions;

  public adminCoursesApi =
    'https://hasanzohdy.com/mentor/back/public/api/admin/courses';
  public adminTopicsApi =
    'https://hasanzohdy.com/mentor/back/public/api/admin/topics';
  public userTopicApi = 'https://hasanzohdy.com/mentor/back/public/api/';

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
    return this.http.get<Lesson[]>(this.adminCoursesApi, this.httpOptions);
  }

  // get only one lesson
  getTopic(topicId) {
    this.setHttpOptions();
    return this.http.get(
      this.userTopicApi + `topics/${topicId}`,
      this.httpOptions
    );
  }

  applyAnswer(courseId, topicId, answer) {
    return this.http.post(
      this.userTopicApi + `topics/${topicId}/answer`,
      answer,
      this.httpOptions
    );
  }

  editAnswer(answerId, answer) {
    return this.http.put(
      this.userTopicApi + `answers/${answerId}`,
      answer,
      this.httpOptions
    );
  }

  addNewLesson(lesson) {
    return this.http.post(this.adminTopicsApi, lesson, this.httpOptions);
  }

  editLesson(lessonID, lesson) {
    return this.http.put(
      this.adminTopicsApi + `/${lessonID}`,
      lesson,
      this.httpOptions
    );
  }

  deleteLesson(lesson) {
    return this.http.delete(
      this.adminTopicsApi + `/${lesson.id}`,
      this.httpOptions
    );
  }
}
