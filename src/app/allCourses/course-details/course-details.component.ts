import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../../services/courses.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Course } from '../../models/course';
// import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.scss']
})
export class CourseDetailsComponent implements OnInit {
  public course: Course;
  public load = true;
  public data = false;
  public courseID: number;
  public user;
  public apply = true;
  public applied = false;
  public applyText = 'Subscribe';
  public disableBtn = false;
  public currentUser;
  message: string;

  constructor(
    private coursesService: CoursesService,
    private route: ActivatedRoute,
    private serviceTitle: Title,
    private router: Router // private dataService: DataService,
  ) {}

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));

    this.courseID = this.route.snapshot.params['id'];
    this.coursesService.getCourse(this.courseID).subscribe(
      response => {
        this.course = response['record'];
        if (this.course['subscribed']) {
          this.applyText = `<i class="ti ti-check bold"></i> Subscribed`;
          this.applied = true;
          this.apply = false;
          this.disableBtn = true;
        }
        this.serviceTitle.setTitle(`${this.course['name']}`);
      },
      error => {
        this.router.navigate(['404']);
        console.log(error);
      },
      () => {
        this.data = true;
        this.load = false;
      }
    );
  }

  takeCourse() {
    if (this.user.gold < this.course['cost']) {
      alert('You dont have enough gold');
      return;
    } else {
      if (
        confirm(
          `Are you sure you want to subscribe to ${
            this.course['name']
          } course ?`
        )
      ) {
        this.coursesService.applyToCourse(this.courseID).subscribe(
          response => {
            this.applied = true;
            this.apply = false;
            this.applyText = `<i class="ti ti-check bold"></i> Subscribed`;
            this.disableBtn = true;
          },
          error => {
            console.log(error.message);
          }
        );
      }
    }
  }

  navigateToTopic(id) {
    this.router.navigate([`dashboard/courses/${this.course['id']}/topic`, id]);
  }
}
