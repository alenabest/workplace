import { NgModule } from '@angular/core';

import { ImageViewerDialogComponent } from './component/image-viewer-dialog.component';
import { CoreModule, MaterialModules } from '../../../core';


@NgModule({
  declarations: [ImageViewerDialogComponent],
  imports: [
    CoreModule,
    MaterialModules
  ],
  exports: [ImageViewerDialogComponent]
})
export class ImageViewerDialogModule {
}
