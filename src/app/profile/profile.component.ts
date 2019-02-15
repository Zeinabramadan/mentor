import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { CoursesService } from '../services/courses.service';
import { UserService } from '../services/user.service';
// import { crud, Test } from '../../assets/crud';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public topics = [];
  public courses = [];
  public user = {};
  public load = true;
  public data = false;
  public totalAnswers = [];
  constructor(
    private titleService: Title,
    private coursesService: CoursesService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.titleService.setTitle('Dashboard');

    this.userService.currentUserAnswers().subscribe(
      response => {
        this.totalAnswers = response['answers'];
      },
      error => {
        console.log(error);
      },
      () => {
        this.data = true;
        this.load = false;
      }
    );

    this.coursesService.getUserCourses().subscribe(
      response => {
        this.courses = response['records'];
      },
      error => console.log(error)
    );
  }
}
