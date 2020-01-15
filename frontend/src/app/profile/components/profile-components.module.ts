import { NgModule } from '@angular/core';

import { ImageViewerDialogComponent } from '../../common/dialogs/image-viewer-dialog/component/image-viewer-dialog.component';
import { ChangePasswordDialogComponent } from '../dialogs/change-password-dialog/change-password-dialog.component';
import { ImageViewerDialogModule } from '../../common/dialogs/image-viewer-dialog/image-viewer-dialog.module';
import { AvatarEditorDialogComponent } from '../dialogs/avatar-editor-dialog/avatar-editor-dialog.component';
import { ProfileAvatarComponent } from './profile-avatar/profile-avatar.component';
import { ProfileCardComponent } from './profile-card/profile-card.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { CoreModule, MaterialModules } from '../../core';


@NgModule({
  declarations: [
    ProfilePageComponent,
    ProfileCardComponent,
    ProfileAvatarComponent
  ],
  imports: [
    ImageViewerDialogModule,
    CoreModule,
    MaterialModules
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
