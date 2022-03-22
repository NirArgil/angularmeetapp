import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomePageComponent implements OnInit {
  username: string | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.username = localStorage.getItem('LoggedIn')
  }

  loggedinUser() {
    if (localStorage.getItem('LoggedIn')) {
      return true;
    }
  }

  logout() {
    this.authService.logout();
  }

}
