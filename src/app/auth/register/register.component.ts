import { Component, OnInit } from '@angular/core';
// import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  hide = true;
  hidePass = true;
  public userData = {
    email: '',
    name: '',
    password: '',
    confirmPassword: ''
  };
  public mustMatch = false;
  public error = false;
  public errorMessage = '';
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {}

  register() {
    this.authService.register(this.userData).subscribe(
      response => {
        localStorage.setItem('user', JSON.stringify(response['user']));
        this.router.navigate(['/']);
      },
      error => {
        this.error = true;
        this.errorMessage = error.error.errors.email;
      }
    );
  }
}
