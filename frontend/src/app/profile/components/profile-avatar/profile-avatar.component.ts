import { Component } from '@angular/core';
import { map, switchMap, takeUntil } from 'rxjs/operators';
import { MatDialog } from '@angular/material';
import { Observable, of } from 'rxjs';

import { ImageViewerDialogComponent } from '../../../common/dialogs/image-viewer-dialog/component/image-viewer-dialog.component';
import { AvatarEditorDialogComponent } from '../../dialogs/avatar-editor-dialog/avatar-editor-dialog.component';
import { SnackBarService } from '../../../core/services/snack-bar';
import { BaseDestroy } from '../../../common/models/base-destroy';
import { UserService } from '../../../core/services/user';
import { AuthService } from '../../../core/services/auth';


@Component({
  selector: 'profile-avatar',
  templateUrl: './profile-avatar.component.html',
  styleUrls: ['./profile-avatar.component.scss']
})
export class ProfileAvatarComponent extends BaseDestroy {
  userId: number;
  userAvatar: string;
  noAvatarUrl = 'assets/images/no-image.png';

  constructor(private snackBarService: SnackBarService,
              private userService: UserService,
              private authService: AuthService,
              private dialog: MatDialog) {
    super();
    this.userId = this.authService.currentUser.id;
    this.userAvatar = this.authService.currentUser.avatar;
  }

  deleteAvatar() {
    this.userService.updateUser(this.userId, { avatar: null })
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(() => this.completeActions(null, null, 'Фото удалено'));
  }

  openImageViewerDialog() {
    this.dialog.open(ImageViewerDialogComponent, { data: [this.userAvatar] });
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
        switchMap((avatar: Blob) => this.checkAvatar(avatar)),
        takeUntil(this.destroy$)
      )
      .subscribe((url: string) => this.completeActions(url, this.getAvatarUrl(url), 'Фото обновлено'));
  }

  checkAvatar(avatar: Blob): Observable<string> {
    if (avatar) {
      return this.uploadAvatar(avatar);
    }

    return of();
  }

  uploadAvatar(avatar: Blob): Observable<string> {
    return this.userService.uploadAvatar(avatar, this.userId)
      .pipe(
        map(result => result.url)
      );
  }

  getAvatarUrl(url: string): string {
    return url + `?${new Date().getTime()}`;
  }

  completeActions(url: string, avatarUrl: string, message: string) {
    this.userAvatar = avatarUrl;
    this.authService.currentUser.avatar = url;
    this.snackBarService.openSnackBar(message);
  }
}
