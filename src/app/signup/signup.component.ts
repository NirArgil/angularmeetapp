import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import Validation from './password.validator';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  signupForm = new FormGroup(
    {
      fullName: new FormControl(undefined, [Validators.required]),
      email: new FormControl(
        undefined,
        Validators.compose([Validators.required, Validators.email])
      ),
      phoneNumber: new FormControl(undefined, [Validators.minLength(10)]),
      password: new FormControl(
        undefined,
        Validators.compose([Validators.required, Validators.minLength(4)])
      ),
      confirmPassword: new FormControl(
        undefined,
        Validators.compose([Validators.required, Validators.minLength(4)])
      ),
    },
    { validators: [Validation.match('password', 'confirmPassword')] }
  );

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {}

  signUp() {
    this.http
      .post<any>('http://localhost:3000/signupUsers', this.signupForm.value)
      .subscribe({
        next: (res) => {
          alert('Sign Up Success');
          this.signupForm.reset();
          this.router.navigate(['/login']);
        },
        error: (err) => {
          alert('Sign Up Error');
        },
      });
  }
}
