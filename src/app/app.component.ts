import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  username$: string | null = null;

  constructor(public dialog: MatDialog, private authService: AuthService) {
  }
  
  ngOnInit(): void {
    
    this.username$ = localStorage.getItem('LoggedIn');
    this.authService.setUser(this.username$)
  }
}