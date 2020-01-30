import { NgModule } from '@angular/core';
import { ImageCropperModule } from 'ngx-image-cropper';

import { ChangePasswordDialogComponent } from './change-password-dialog';
import { AvatarEditorDialogComponent } from './avatar-editor-dialog';
import { CoreModule, MaterialModules } from '../../core';


const dialogs = [
  AvatarEditorDialogComponent,
  ChangePasswordDialogComponent
];

@NgModule({
  declarations: [dialogs],
  imports: [
    CoreModule,
    MaterialModules,
    ImageCropperModule
  ],
  exports: [dialogs]
})
export class ProfileDialogsModule {
}
