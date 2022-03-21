import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { DataService } from '../data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  formGroup = new FormGroup({
    email: new FormControl(undefined, [Validators.required]),
    password: new FormControl(
      undefined,
      Validators.compose([Validators.required, Validators.minLength(4)])
    ),
  });

  auth: boolean;

  constructor(
    private data: DataService,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.data.currentAuth.subscribe((auth) => (this.auth = auth));
  }

  onSubmit() {
    this.http.get<any>('http://localhost:3000/users').subscribe({
      next: (res) => {
        let verifiedUser = res.find((a: any) => {
          return (
            a.email === this.formGroup.value.email &&
            a.password === this.formGroup.value.password
          );
        });
        if (verifiedUser) {
          alert('Login success');

          this.authService.login(this.formGroup.value['email']);
          this.formGroup.reset();
          // localStorage.setItem('LoggedIn', 'true');

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
