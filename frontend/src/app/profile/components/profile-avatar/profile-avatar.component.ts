import { Component } from '@angular/core';
import { takeUntil } from 'rxjs/operators';

import { BaseDestroy } from '../../../shared/models/base-destroy';
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

  constructor(private userService: UserService,
              private authService: AuthService) {
    super();
    this.userId = this.authService.currentUser.id;
    this.userAvatar = this.authService.currentUser.avatar;
  }

  uploadAvatar(event) {
    this.userService.uploadAvatar(event.target.files[0], this.userId)
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe((result: {url: string}) => this.completeUploadAvatar(result.url));
  }

  completeUploadAvatar(url: string) {
    this.authService.currentUser.avatar = url;
    this.userAvatar = url;
  }
}
