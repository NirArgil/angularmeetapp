import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MeetingsPageComponent } from './meetingsPage.component';
import { MeetingsPageRoutingModule } from './meetings-routing.module';

@NgModule({
  declarations: [
    MeetingsPageComponent
  ],
  imports: [
    CommonModule,
    MeetingsPageRoutingModule,
    ReactiveFormsModule,
    MatButtonModule
  ]
})
export class MeetingsPageModule { }
