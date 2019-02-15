import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { AnswersService } from '../../services/answers.service';
import { Title } from '@angular/platform-browser';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-answers',
  templateUrl: './answers.component.html',
  styleUrls: ['./answers.component.scss']
})
export class AnswersComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;

  public answers;
  public answerData = {};
  public editMode;
  public disabled = false;
  public openAddModal = false;
  public answerStatus = ['pending', 'approved', 'rejected'];
  displayedColumns = ['id', 'name', 'topic', 'by', 'controls'];

  constructor(
    private serviceTitle: Title,
    private answersService: AnswersService,
    private snackBar: MatSnackBar
  ) {}

  getAnswers() {
    this.answersService.getAnswers().subscribe(
      response => {
        this.answers = response['records'];
      },
      error => {
        console.log(error);
      }
    );
  }

  ngOnInit() {
    this.serviceTitle.setTitle('Manage answers');
    this.getAnswers();
  }

  submit(f) {
    this.disabled = true;
    this.answersService.changeStatus(this.answerData['id'], f).subscribe(
      response => {
        this.snackBar.open('Changed', '', {
          duration: 2000
        });
        this.getAnswers();
        this.closeModal();
      },
      error => {
        this.disabled = false;
      }
    );
  }

  closeModal() {
    this.openAddModal = false;
  }
  executeOnClose() {
    this.closeModal();
  }
}
