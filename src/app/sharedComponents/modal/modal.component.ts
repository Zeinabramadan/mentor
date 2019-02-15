import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  @Input() modalHeader;
  @Output() hideModal: EventEmitter<boolean> = new EventEmitter<boolean>();

  public close = false;
  constructor() {}

  ngOnInit() {}

  closeModal() {
    this.hideModal.emit(this.close);
  }
}
