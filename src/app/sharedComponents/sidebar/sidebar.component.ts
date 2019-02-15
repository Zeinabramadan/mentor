import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SidebarComponent implements OnInit {
  public user: Boolean;
  public admin: Boolean;
  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.sidebarContent();
  }

  sidebarContent() {
    if (this.authService.isLoggedIn() && !this.authService.isAdmin()) {
      this.user = true;
    } else {
      this.admin = true;
    }
  }
}
