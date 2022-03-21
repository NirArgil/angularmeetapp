import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button'
import { CallInfoDialogComponents } from './callinfo-dialog/callinfo-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from "@angular/material/form-field"
import { MatInputModule } from "@angular/material/input"
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CallService } from './call.service';

import { HttpClientModule } from '@angular/common/http';

import { MeetingsPageComponent } from './meetings/meetingsPage.component';
import { DataService } from './data.service';
import { HomePageComponent } from './homepage/homepage.component';
import { AuthService } from './auth.service';


@NgModule({
  declarations: [
    AppComponent,
    CallInfoDialogComponents,

    HomePageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    FormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    ClipboardModule,
    MatSnackBarModule,

    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    CallService,
    DataService,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }