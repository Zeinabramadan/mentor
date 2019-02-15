import { Component, OnInit, OnDestroy } from '@angular/core';
import { Course } from '../../models/course';
import { Title } from '@angular/platform-browser';
import { CoursesService } from '../../services/courses.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit, OnDestroy {
  public load = true;
  public data = false;
  public courses: Course[] = [];
  private unsubscribe$ = new Subject();
  constructor(
    private titleService: Title,
    coursesService: CoursesService,
    private router: Router
  ) {
    coursesService
      .getAllUserCourses()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        response => {
          this.courses = response['records'];
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
  ngOnInit() {
    this.titleService.setTitle('Courses');
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
