import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  firstName = '';
  lastName = '';
  email = '';
  password = '';

  constructor() {
  }

  ngOnInit(): void {
  }

  firstNameFormControl = new FormControl('');
  lastNameFormControl = new FormControl('');

  passwordFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
  ]);

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  matcher = new MyErrorStateMatcher();

  submit = (login: any) => {
    console.log(login);
    if (login.form.status === "VALID") {
      console.log(this.firstName);
      console.log(this.lastName);
      console.log(this.email);
      console.log(this.password);
    }

  }

  onFirstNameChange = (event: any) => {
    console.log(event.target.value)
    this.firstName = event.target.value;
  }

  onLastNameChange = (event: any) => {
    this.lastName = event.target.value;
  }

  onEmailChange = (event: any) => {
    this.email = event.target.value;
  }

  onPasswordChange = (event: any) => {
    this.password = event.target.value;
  }
}


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
