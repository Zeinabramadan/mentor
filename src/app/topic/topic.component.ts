import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { LessonsService } from '../services/lessons.service';
import { Course } from '../models/course';
import { CoursesService } from '../services/courses.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-lesson',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TopicComponent implements OnInit {
  public course: Course;
  public lesson = {};
  public topicId;
  public courseID;
  public answerData = {};
  public user;
  public openAnswerText = false;
  public answerStatus = false;
  public approveMsg = { show: false, status: '' };
  public startQuest = true;
  public editMode = false;
  public answerID = '';
  public data = false;
  public load = true;
  public cancelBtn = false;
  public currentUserAnswer;
  public approvedAnswers = [];

  public disableQuestBtn = false;
  btns = {
    'btn-primary': true,
    'btn-danger': false
  };

  showQuestAnswer() {
    this.openAnswerText = !this.openAnswerText;
    this.answerData['answer'] = '';
    if (this.openAnswerText === true) {
      this.btns = {
        'btn-primary': false,
        'btn-danger': true
      };
    } else {
      this.btns = {
        'btn-primary': true,
        'btn-danger': false
      };
    }
  }

  constructor(
    private lessonService: LessonsService,
    private serviceTitle: Title,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.topicId = this.route.snapshot.params['topicID'];
    this.courseID = this.route.snapshot.params['id'];
    this.lessonService.getTopic(this.topicId).subscribe(
      response => {
        this.lesson = response['record'];
        this.serviceTitle.setTitle(`${this.lesson['title']}`);
        console.log(this.lesson);
        // if (this.lesson['answers']) {
        this.approvedAnswers = this.lesson['answers'].filter(appAnswer => {
          return (
            appAnswer.status === 'approved' && appAnswer.by.id !== this.user.id
          );
        });
        // }
        console.log(this.approvedAnswers);

        this.currentUserAnswer = this.lesson['answers'].filter(item => {
          return item.by.id === this.user['id'];
        });
        console.log(this.currentUserAnswer);
        /**
         * !! back to that stupid function
         */
        if (this.lesson['answered']) {
          this.startQuest = false;
          // if (this.currentUserAnswer.length > 0) {
          // if (this.currentUserAnswer[0]['status'] !== 'pending') {
          //   alert('test');
          //   this.startQuest = true;
          // }
          this.approveMsg = {
            show: true,
            status: this.currentUserAnswer[0]['status']
          };
          // }
          this.disableQuestBtn = true;
        }
      },
      error => {
        if (error.error.error === 'subscribe-first') {
          alert(`You have to the SUBSCRIBE first for the course`);
          this.router.navigate([`dashboard/courses/${this.courseID}`]);
          console.log(this.courseID);
        } else {
          this.router.navigate(['404']);
        }
        console.log(error.error.error);
      },
      () => {
        this.data = true;
        this.load = false;
      }
    );
  }

  ngOnInit() {}

  submitAnswer() {
    if (confirm('Are you want to send your answer ?')) {
      this.startQuest = false;
      if (this.editMode) {
        this.lessonService
          .editAnswer(this.answerID, this.answerData)
          .subscribe(response => {
            this.cancelBtn = false;
            this.openAnswerText = false;
            this.answerStatus = true;
            // this.startQuest = false;
            this.disableQuestBtn = true;
            this.approveMsg = {
              show: true,
              status: 'Waiting for approve'
            };
          });
      } else {
        this.lessonService
          .applyAnswer(this.courseID, this.topicId, this.answerData)
          .subscribe(
            response => {
              this.openAnswerText = false;
              this.answerStatus = true;
              // this.startQuest = false;
              this.disableQuestBtn = true;
              this.approveMsg = {
                show: true,
                status: 'pending'
              };
            },
            error => {
              console.log(error.message);
            }
          );
      }
    }
  }
  editAnswer(id, editedAnswer) {
    this.cancelBtn = true;
    this.editMode = true;
    this.answerID = id;
    this.answerData['answer'] = editedAnswer;
    this.openAnswerText = true;
    this.answerStatus = false;
    this.disableQuestBtn = false;
  }
}
