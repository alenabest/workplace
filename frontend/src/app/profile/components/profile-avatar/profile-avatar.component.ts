import { Component } from '@angular/core';
import { map, switchMap, takeUntil } from 'rxjs/operators';
import { MatDialog } from '@angular/material';
import { Observable, of } from 'rxjs';

import { AvatarEditorDialogComponent } from '../../dialogs/avatar-editor-dialog/avatar-editor-dialog.component';
import { BaseDestroy } from '../../../common/models/base-destroy';
import { UserService } from '../../../core/services/user';
import { AuthService } from '../../../core/services/auth';
import { ImageViewerDialogComponent } from '../../../common/dialogs/image-viewer-dialog/component/image-viewer-dialog.component';


@Component({
  selector: 'profile-avatar',
  templateUrl: './profile-avatar.component.html',
  styleUrls: ['./profile-avatar.component.scss']
})
export class ProfileAvatarComponent extends BaseDestroy {
  userId: number;
  userAvatar: string;
  noAvatarUrl = 'assets/images/no-image.png';

  constructor(private userService: UserService,
              private authService: AuthService,
              private dialog: MatDialog) {
    super();
    this.userId = this.authService.currentUser.id;
    this.userAvatar = this.authService.currentUser.avatar;
  }

  openImageViewerDialog() {
    this.dialog.open(ImageViewerDialogComponent, {data: [this.userAvatar]});
  }

  openAvatarEditorDialog(imageChangedEvent: Event) {
    this.dialog.open(AvatarEditorDialogComponent, {
      data: imageChangedEvent,
      maxWidth: '95vw',
      minWidth: '60vw',
      disableClose: true
    })
      .afterClosed()
      .pipe(
        switchMap((avatar: Blob) => this.uploadAvatar(avatar)),
        takeUntil(this.destroy$)
      )
      .subscribe((url: string) => this.completeUploadAvatar(url));
  }

  uploadAvatar(avatar: Blob): Observable<string> {
    if (avatar) {
      return this.userService.uploadAvatar(avatar, this.userId)
        .pipe(
          map(result => result.url)
        );
    }

    return of();
  }

  completeUploadAvatar(url: string) {
    this.authService.currentUser.avatar = url;
    this.userAvatar = url + `?${new Date().getTime()}`;
  }
}
