import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { MyErrorStateMatcher } from '../register/register.component';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  email = '';
  password = '';

  constructor(public authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  submit = (signin: any) => {
    if (signin.form.status === "VALID") {
      this.authService.SignIn(this.email, this.password);
    }
  }

  matcher = new MyErrorStateMatcher();

  passwordFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
  ]);

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  onEmailChange = (event: any) => {
    this.email = event.target.value;
  }

  onPasswordChange = (event: any) => {
    this.password = event.target.value;
  }
}
