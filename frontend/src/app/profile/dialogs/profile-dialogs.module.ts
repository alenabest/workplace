import { NgModule } from '@angular/core';
import { MatIconModule, MatTooltipModule } from '@angular/material';
import { ImageCropperModule } from 'ngx-image-cropper';

import { ChangePasswordDialogComponent } from './change-password-dialog';
import { AvatarEditorDialogComponent } from './avatar-editor-dialog';
import { BaseDialogMaterialModules, CoreModule } from '../../core';


const dialogs = [
  AvatarEditorDialogComponent,
  ChangePasswordDialogComponent
];

@NgModule({
  declarations: [dialogs],
  imports: [
    BaseDialogMaterialModules,
    ImageCropperModule,
    MatTooltipModule,
    MatIconModule,
    CoreModule
  ],
  exports: [dialogs]
})
export class ProfileDialogsModule {
}
