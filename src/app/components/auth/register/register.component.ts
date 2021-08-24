import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  displayName = '';
  photoUrl = '';
  email = '';
  password = '';

  constructor(public authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
  }

  displayNameFormControl = new FormControl('');
  photoUrlFormControl = new FormControl('');

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
    // console.log(login);
    if (login.form.status === "VALID") {
      // console.log(this.displayName);
      // console.log(this.photoUrl);
      // console.log(this.email);
      // console.log(this.password);
      this.authService.SignUp(this.email, this.password, this.displayName, this.photoUrl)
        .then(res => this.router.navigate(['/signin']))
        .catch(error => {
          this.displayName = '';
          this.photoUrl = '';
          this.email = '';
          this.password = '';
        });
    }
  }

  onDisplayNameChange = (event: any) => {
    this.displayName = event.target.value;
  }

  onPhotoUrlChange = (event: any) => {
    this.photoUrl = event.target.value;
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
