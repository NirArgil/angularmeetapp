import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  formGroup = new FormGroup({
    email: new FormControl(undefined, [Validators.required]),
    password: new FormControl(undefined, Validators.compose([Validators.required, Validators.minLength(4)])),
  });

  auth:boolean;

  constructor(
    private data: DataService,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.data.currentAuth.subscribe(auth => this.auth = auth)
  }

  login() {
    this.http.get<any>('http://localhost:3000/signupUsers').subscribe({
      next: (res) => {
        let user = res.find((a: any) => {
          return (
            a.email === this.formGroup.value.email &&
            a.password === this.formGroup.value.password
          );
        });
        if (user) {
          alert('Login success');
          this.formGroup.reset();
          this.router.navigate(['meetings']);
          localStorage.setItem('LoggedIn', "true")

          // this.authLogin();
        } else {
          alert('User not found');
        }
      },
      error: () => {
        alert('Something went wrong');
      },
    });
  }

  authLogin() {
    this.data.changeAuthStatus(true);
  }
 
}
