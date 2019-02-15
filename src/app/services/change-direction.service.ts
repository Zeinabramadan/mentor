import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChangeDirectionService {
  constructor() {}

  changeDirection() {
    const htmlEl = document.getElementsByTagName('html')[0];
    const bodyEl = document.getElementsByTagName('body')[0];
    const dir = htmlEl.getAttribute('dir');
    if (dir === 'ltr') {
      htmlEl.setAttribute('dir', 'rtl');
      bodyEl.className = 'rtl';
      bodyEl.style.textAlign = 'right';
    } else {
      htmlEl.setAttribute('dir', 'ltr');
      bodyEl.className = 'ltr';
      bodyEl.style.textAlign = 'left';
    }
  }
}
