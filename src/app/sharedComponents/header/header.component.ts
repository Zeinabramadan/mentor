import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ChangeDirectionService } from '../../services/change-direction.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public user = { name: '', gold: 0 };
  message: string;
  public currentUser;
  constructor(
    private authService: AuthService,
    private router: Router,
    private userService: UserService,
    private dir: ChangeDirectionService
  ) {}

  ngOnInit() {
    this.userService.userInfo().subscribe(response => {
      this.user = response['user'];
    });
    // this.user = JSON.parse(localStorage.getItem('user'));
  }

  logOut() {
    this.authService.logOutUser();
    this.router.navigate(['/login']);
  }
  changeDir() {
    this.dir.changeDirection();
  }
}
