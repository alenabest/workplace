import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImageViewerDialogComponent } from './component/image-viewer-dialog.component';
import { FlexLayoutModule } from '@angular/flex-layout';


@NgModule({
  declarations: [ImageViewerDialogComponent],
  imports: [
    CommonModule,
    FlexLayoutModule
  ],
  exports: [ImageViewerDialogComponent]
})
export class ImageViewerDialogModule {
}
