import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { CoursesService } from '../../services/courses.service';
import { Title } from '@angular/platform-browser';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-admin-courses',
  templateUrl: './admin-courses.component.html',
  styleUrls: ['./admin-courses.component.scss']
})
export class AdminCoursesComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;

  public courses;
  public courseData = {};
  public img;
  public addSaveBtn;
  public header;
  public courseFormData = new FormData();
  public editMode;
  public disabled = false;
  public openAddModal = false;
  displayedColumns = [
    'id',
    'image',
    'name',
    'sort',
    'topics',
    'cost',
    'controls'
  ];

  constructor(
    private coursesService: CoursesService,
    private serviceTitle: Title,
    private snackBar: MatSnackBar
  ) {}

  getCourses() {
    this.coursesService.getAllCourses().subscribe(response => {
      if (!response) {
        return;
      }
      this.courses = new MatTableDataSource(response['records']);
      this.courses.paginator = this.paginator;
    });
  }

  ngOnInit() {
    this.serviceTitle.setTitle('Manage courses');
    this.getCourses();
  }

  uploadImg(event) {
    this.img = event.target.files[0];
    this.courseFormData.append('image', this.img);
  }

  onChange(e) {
    this.courseData['display'] = !this.courseData['display'];
    if (e.checked) {
      this.courseFormData.append('display', '1');
    }
  }

  editCourse(courseId, course) {
    this.courseFormData.append('name', this.courseData['name']);
    this.courseFormData.append('description', this.courseData['description']);
    this.courseFormData.append('cost', this.courseData['cost']);
    this.courseFormData.append('sortOrder', this.courseData['sortOrder']);
    this.coursesService.editCourse(courseId, course).subscribe(
      response => {
        this.disabled = false;
        this.snackBar.open(
          'Course updated successfully',
          this.courseData['name'],
          {
            duration: 2000
          }
        );
        this.closeModal();
      },
      error => {
        this.disabled = false;
        console.log(error.message);
      }
    );
  }

  addCourse() {
    this.courseFormData.append('name', this.courseData['name']);
    this.courseFormData.append('description', this.courseData['description']);
    this.courseFormData.append('cost', this.courseData['cost']);
    this.courseFormData.append('sortOrder', this.courseData['sortOrder']);
    this.coursesService.addNewCourse(this.courseFormData).subscribe(
      response => {
        this.snackBar.open(
          'Course added successfully',
          this.courseData['name'],
          {
            duration: 2000
          }
        );
        this.closeModal();
        this.getCourses();
      },
      error => {
        this.disabled = false;
        console.log(error.message);
      }
    );
  }

  deleteCourse(course) {
    if (confirm(`Delete ${course.name}`)) {
      this.coursesService.deleteCourse(course).subscribe(
        response => {
          this.getCourses();
          this.snackBar.open('Course Deleted successfully', `${course.name}`, {
            duration: 2000
          });
        },
        error => {
          console.log(error.message);
        }
      );
    }
  }

  submit() {
    this.disabled = true;
    if (this.editMode) {
      this.courseFormData.append('_method', 'PUT');
      this.editCourse(this.courseData['id'], this.courseFormData);
    } else {
      this.addCourse();
    }
  }
  closeModal() {
    this.openAddModal = false;
  }
  executeOnClose() {
    this.closeModal();
  }

  applyFilter(filterValue: string) {
    this.courses.filter = filterValue.trim().toLowerCase();
  }
}
