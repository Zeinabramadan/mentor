import {
  Component,
  OnChanges,
  ViewEncapsulation,
  Input,
  SimpleChanges,
  OnInit,
  SimpleChange
} from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CardComponent implements OnChanges, OnInit {
  @Input() courseData: [];
  private data: [];
  constructor() {}

  ngOnChanges(changes: SimpleChanges) {
    const test: SimpleChange = changes.courseData;
    // if (changes['courseData']) {
    this.data = test.currentValue;
    // }
    // this.data = this.courseData;
  }

  ngOnInit() {
    console.log(this.data);
    // this.data = this.courseData;
  }
}
