import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CoursesService } from '../services/courses.service';

@Component({
  selector: 'app-user-courses',
  templateUrl: './user-courses.component.html',
  styleUrls: ['./user-courses.component.scss']
})
export class UserCoursesComponent implements OnInit {
  public lessons = [];
  public courses = [];
  public user = {};
  public noCourses = false;
  public data = false;
  public load = true;
  constructor(private router: Router, private coursesService: CoursesService) {}

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.coursesService.getUserCourses().subscribe(
      response => {
        this.courses = response['records'];
        if (this.courses.length === 0) {
          this.noCourses = true;
        }
      },
      error => {
        console.log(error);
      },
      () => {
        this.data = true;
        this.load = false;
      }
    );
  }

  viewCourse(id) {
    this.router.navigate(['dashboard/courses', id]);
  }
  viewAllCourses() {
    this.router.navigate(['dashboard/courses']);
  }
}
