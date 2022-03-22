import {
  Component,
  ElementRef,
  OnInit,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable, of, Subscription } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';
import { AuthService } from '../auth.service';
import { CallService } from '../call.service';
import {
  CallInfoDialogComponents,
  DialogData,
} from '../callinfo-dialog/callinfo-dialog.component';
import { DataService } from '../data.service';

@Component({
  selector: 'app-meetingsPage',
  templateUrl: './meetingsPage.component.html',
  styleUrls: ['./meetingsPage.component.scss'],
})
export class MeetingsPageComponent implements OnInit, OnDestroy {
  public isCallStarted$: Observable<boolean>;
  private peerId: string | undefined;

  @ViewChild('localVideo') localVideo: ElementRef<HTMLVideoElement>;
  @ViewChild('remoteVideo') remoteVideo: ElementRef<HTMLVideoElement>;

  auth: boolean;

  userName: string | null = null;
  subscription: Subscription = new Subscription();

  constructor(
    public dialog: MatDialog,
    private callService: CallService,
    private data: DataService,
    private authService: AuthService,
    private router: Router,
  ) {
    this.isCallStarted$ = this.callService.isCallStarted$;
    this.peerId = this.callService.initPeer();
  }

  ngOnInit(): void {
    this.data.currentAuth.subscribe((auth) => (this.auth = auth));

    this.subscription = this.authService
      .getUser()
      .subscribe((user) => (this.userName = user));

    this.callService.localStream$
      .pipe(filter((res) => !!res))
      .subscribe(
        (stream) => (this.localVideo.nativeElement.srcObject = stream)
      );
    this.callService.remoteStream$
      .pipe(filter((res) => !!res))
      .subscribe(
        (stream) => (this.remoteVideo.nativeElement.srcObject = stream)
      );
  }

  ngOnDestroy(): void {
    this.callService.destroyPeer();
    this.subscription.unsubscribe();
  }

  public showModal(joinCall: boolean): void {
    let dialogData: DialogData = joinCall
      ? { peerId: '', joinCall: true }
      : { peerId: this.peerId, joinCall: false };
    const dialogRef = this.dialog.open(CallInfoDialogComponents, {
      width: '250px',
      data: dialogData,
    });

    dialogRef
      .afterClosed()
      .pipe(
        switchMap((peerId) =>
          joinCall
            ? of(this.callService.establishMediaCall(peerId))
            : of(this.callService.enableCallAnswer())
        )
      )
      .subscribe((_) => {});
  }

  public endCall() {
    this.callService.closeMediaCall();
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/home');
  }

  loggedinUser() {
    if (localStorage.getItem('LoggedIn')) {
      return true;
    }
  }

}
