import { Component, OnDestroy } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { MatDialog } from '@angular/material/dialog';
import { map, switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { ImageViewerDialogComponent } from '../../common/dialogs/image-viewer-dialog/component';
import { AvatarEditorDialogComponent } from '../avatar-editor-dialog';
import { SnackBarService } from '../../core/services/snack-bar';
import { UserService } from '../../core/services/user';
import { LoginService } from '../../login';


@UntilDestroy()
@Component({
  selector: 'profile-avatar',
  templateUrl: './profile-avatar.component.html',
  styleUrls: ['./profile-avatar.component.scss']
})
export class ProfileAvatarComponent implements OnDestroy {
  userId: number;
  userAvatar: string;
  noAvatarUrl = 'assets/images/no-image.png';

  constructor(private snackBarService: SnackBarService,
              private userService: UserService,
              private loginService: LoginService,
              private dialog: MatDialog) {
    this.userId = this.loginService.currentUser.id;
    this.userAvatar = this.loginService.currentUser.avatar;
  }

  ngOnDestroy() {
  }

  deleteAvatar() {
    this.userService.updateUser(this.userId, {avatar: null})
      .pipe(untilDestroyed(this))
      .subscribe(() => this.completeActions(null, null, 'Фото удалено'));
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
        switchMap((avatar: Blob) => this.checkAvatar(avatar)),
        untilDestroyed(this)
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
        map(result => result.avatar)
      );
  }

  getAvatarUrl(url: string): string {
    return url + `?${new Date().getTime()}`;
  }

  completeActions(url: string, avatarUrl: string, message: string) {
    this.userAvatar = avatarUrl;
    this.loginService.currentUser.avatar = url;
    this.snackBarService.success(message);
  }
}
