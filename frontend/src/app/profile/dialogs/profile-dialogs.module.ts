import { NgModule } from '@angular/core';
import { ImageCropperModule } from 'ngx-image-cropper';

import { AvatarEditorDialogComponent } from './avatar-editor-dialog/avatar-editor-dialog.component';
import { CoreModule, MaterialModules } from '../../core';


const dialogs = [
  AvatarEditorDialogComponent
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
