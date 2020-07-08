import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { FlexModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';

import { ImageViewerDialogModule } from '../common/dialogs/image-viewer-dialog';
import { PhoneMaskDirectiveModule } from '../common/directives/phone-mask';
import { ChangePasswordDialogComponent } from './change-password-dialog';
import { AvatarEditorDialogComponent } from './avatar-editor-dialog';
import { ProfileAvatarComponent } from './profile-avatar';
import { ProfileComponent } from './profile.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { PROFILE_ROUTES } from './profile.routes';

@NgModule({
  declarations: [
    ProfileComponent,
    ProfileAvatarComponent,
    ChangePasswordDialogComponent,
    AvatarEditorDialogComponent
  ],
  imports: [
    RouterModule.forChild(PROFILE_ROUTES),
    PhoneMaskDirectiveModule,
    ImageViewerDialogModule,
    ImageCropperModule,
    CommonModule,
    MatCardModule,
    MatIconModule,
    FlexModule,
    MatButtonModule,
    MatTooltipModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
  ],
  exports: [ProfileComponent]
})
export class ProfileModule {
}
