import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  public user;
  public token;
  public httpOptions;
  constructor(private http: HttpClient) {}

  setHttpOptions() {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.token = this.user['accessToken'];
    this.httpOptions = {
      headers: new HttpHeaders({
        // 'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.token
      })
    };
  }
  // get all courses
  getAllCourses() {
    this.setHttpOptions();
    return this.http.get(
      environment.BASE_ADMIN_URL + 'courses',
      this.httpOptions
    );
  }

  getUserCourses() {
    this.setHttpOptions();
    return this.http.get(environment.BASE_URL + 'me/courses', this.httpOptions);
  }

  // get all courses
  getAllUserCourses() {
    this.setHttpOptions();
    return this.http.get(environment.BASE_URL + 'courses', this.httpOptions);
  }

  applyToCourse(courseId) {
    return this.http.get(
      environment.BASE_URL + `courses/${courseId}/subscribe`,
      this.httpOptions
    );
  }

  isApplied() {
    return true;
    // return this.http.get(this.coursesApi);
  }

  // get only one course
  getCourse(courseId) {
    this.setHttpOptions();
    return this.http.get(
      environment.BASE_URL + `courses/${courseId}`,
      this.httpOptions
    );
  }

  addNewCourse(course) {
    return this.http.post(
      environment.BASE_ADMIN_URL + 'courses',
      course,
      this.httpOptions
    );
  }

  editCourse(courseId, course) {
    return this.http.post(
      environment.BASE_ADMIN_URL + `courses/${courseId}`,
      course,
      this.httpOptions
    );
  }

  deleteCourse(course) {
    return this.http.delete(
      environment.BASE_ADMIN_URL + `courses/${course.id}`,
      this.httpOptions
    );
  }
}
