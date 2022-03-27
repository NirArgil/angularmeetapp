import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(
    null
  );

  getUser(): Observable<string | null> {
    return this.user$.asObservable();
  }

  setUser(user: string | null) {
    this.user$.next(user);
  }

  login(user: string) {
    this.setUser(user);
    this.router.navigateByUrl('/meetings');
  }

  logout() {
    this.user$.next(null);
    localStorage.removeItem('LoggedIn');
  }

  constructor(private router: Router) {}
}