import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../_services/auth.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  form: any = {
    email: null,
    login: null,
    username: null,
    password: null,
    birthDate: null,
    country: null
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {

  }

  onSubmit(): void {
    const {email,login,username,password,birthDate,country} = this.form;
    this.authService.register(email,login,username,password,birthDate,country).subscribe({
      next: data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    });
  }
}
