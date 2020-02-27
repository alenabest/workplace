import { NgModule } from '@angular/core';

import { ImageViewerDialogComponent } from '../../common/dialogs/image-viewer-dialog/component';
import { ImageViewerDialogModule } from '../../common/dialogs/image-viewer-dialog';
import { ChangePasswordDialogComponent } from '../dialogs/change-password-dialog';
import { PhoneMaskDirectiveModule } from '../../common/directives/phone-mask';
import { AvatarEditorDialogComponent } from '../dialogs/avatar-editor-dialog';
import { ProfileAvatarComponent } from './profile-avatar';
import { CoreModule, MaterialModules } from '../../core';
import { ProfilePageComponent } from './profile-page';
import { ProfileCardComponent } from './profile-card';


@NgModule({
  declarations: [
    ProfilePageComponent,
    ProfileCardComponent,
    ProfileAvatarComponent
  ],
  imports: [
    PhoneMaskDirectiveModule,
    ImageViewerDialogModule,
    MaterialModules,
    CoreModule
  ],
  entryComponents: [
    ChangePasswordDialogComponent,
    AvatarEditorDialogComponent,
    ImageViewerDialogComponent
  ],
  exports: [ProfilePageComponent]
})

export class ProfileComponentsModule {
}
