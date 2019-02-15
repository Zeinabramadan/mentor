import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { LessonsService } from '../../services/lessons.service';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-admin-lessons',
  templateUrl: './admin-lessons.component.html',
  styleUrls: ['./admin-lessons.component.scss']
})
export class AdminLessonsComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;

  public lessons;
  public addSaveBtn;
  public header;
  public lessonData = {};
  public course;
  public editMode;
  public disabled = false;
  public openAddModal = false;
  public courseName = '';
  displayedColumns = ['id', 'title', 'quest', 'sortorder', 'prize', 'controls'];
  constructor(
    private lessonsService: LessonsService,
    private serviceTitle: Title,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {}

  getTopics() {
    this.lessonsService.getAllLessons().subscribe(response => {
      this.course = response['records'].filter(course => {
        return course.id === +this.route.snapshot.params['id'];
      });
      this.lessons = new MatTableDataSource(this.course[0].topics);
      this.lessons.paginator = this.paginator;
      console.log(this.lessons.data);
      this.courseName = this.lessons.data[0].course.name;
    });
  }
  ngOnInit() {
    this.serviceTitle.setTitle('Manage topics');
    this.getTopics();
  }

  editLesson(lessonID, lesson) {
    this.lessonData['courseId'] = this.route.snapshot.params['id'];
    this.lessonsService.editLesson(lessonID, lesson).subscribe(
      response => {
        this.snackBar.open('Topic updated successfully', `${lesson.title}`, {
          duration: 2000
        });
        this.closeModal();
      },
      error => {
        this.disabled = false;
        console.log(error.message);
      }
    );
  }

  addLesson() {
    this.lessonData['courseId'] = this.route.snapshot.params['id'];
    this.lessonsService.addNewLesson(this.lessonData).subscribe(
      response => {
        this.snackBar.open(
          'Topic added successfully',
          `${this.lessonData['title']}`,
          {
            duration: 2000
          }
        );
        this.getTopics();
        this.closeModal();
      },
      error => {
        this.disabled = false;
        console.log(error.message);
      }
    );
  }

  deleteLesson(lesson) {
    if (confirm(`Delete ${lesson.title} ?`)) {
      this.lessonsService.deleteLesson(lesson).subscribe(
        response => {
          this.snackBar.open('Topic deleted successfully', `${lesson.title}`, {
            duration: 2000
          });
          this.getTopics();
        },
        error => {
          console.log(error.message);
        }
      );
    }
  }

  submit(f) {
    this.disabled = true;
    f.courseId = this.route.snapshot.params['id'];
    if (this.editMode) {
      this.editLesson(this.lessonData['id'], f);
    } else {
      this.addLesson();
    }
  }
  closeModal() {
    this.openAddModal = false;
  }
  executeOnClose() {
    this.closeModal();
  }
}
