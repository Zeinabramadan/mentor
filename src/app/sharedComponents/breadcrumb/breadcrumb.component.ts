import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {
  public user: Boolean;
  public admin: Boolean;
  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.breadCrumbContent();
  }

  breadCrumbContent() {
    if (this.authService.isLoggedIn() && !this.authService.isAdmin()) {
      this.user = true;
    } else {
      this.admin = true;
    }
  }
}
