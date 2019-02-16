import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public userLoginData = {
    email: '',
    password: ''
  };
  public error = false;
  public errorMessage = '';
  hide = true;

  constructor(
    private authService: AuthService,
    private router: Router,
    private titleService: Title
  ) {}

  ngOnInit() {
    this.titleService.setTitle('Login');
  }

  login() {
    this.authService.loginUser(this.userLoginData).subscribe(
      response => {
        localStorage.setItem('user', JSON.stringify(response['user']));
        this.router.navigate(['/']);
      },
      error => {
        this.error = true;
        if (this.userLoginData['email'] === '') {
          this.error = false;
        }
        console.log(error);
        this.errorMessage = error.error.error;
      }
    );
  }
}
