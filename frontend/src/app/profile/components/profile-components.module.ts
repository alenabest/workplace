import { NgModule } from '@angular/core';

import { ProfilePageComponent } from './profile-page/profile-page.component';
import { CoreModule, MaterialModules } from '../../core';
import { ProfileCardComponent } from './profile-card/profile-card.component';
import { ProfileAvatarComponent } from './profile-avatar/profile-avatar.component';
import { AvatarEditorDialogComponent } from '../dialogs/avatar-editor-dialog/avatar-editor-dialog.component';
import { ImageViewerDialogComponent } from '../../common/dialogs/image-viewer-dialog/component/image-viewer-dialog.component';
import { ImageViewerDialogModule } from '../../common/dialogs/image-viewer-dialog/image-viewer-dialog.module';


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
    AvatarEditorDialogComponent,
    ImageViewerDialogComponent
  ],
  exports: [ProfilePageComponent]
})

export class ProfileComponentsModule {
}
