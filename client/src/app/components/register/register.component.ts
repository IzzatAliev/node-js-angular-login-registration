import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../_services/auth.service";
import {StorageService} from "../../_services/storage.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  countries:Array<string> = ['kiril', 'anton']

  selected: Date | null | undefined;

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

  constructor(private authService: AuthService, private storageService: StorageService) {
  }

  ngOnInit(): void {
    if (this.storageService.isLoggedIn()) {
      this.isSuccessful = true;
    }
  }

  onSubmit(): void {
    const {email,login,username,password,birthDate,country} = this.form;
    this.authService.register(email,login,username,password,birthDate,country).subscribe({
      next: data => {
        console.log(data);
        this.storageService.saveUser(data);
        this.isSignUpFailed = false;
        this.isSuccessful = true;
        this.reloadPage();
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    });
  }

  reloadPage(): void {
    window.location.reload();
    this.ngOnInit()
  }
}
