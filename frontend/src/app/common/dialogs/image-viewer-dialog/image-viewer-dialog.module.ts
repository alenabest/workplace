import { NgModule } from '@angular/core';

import { CoreModule, MaterialModules } from '../../../core';
import { ImageViewerDialogComponent } from './component';


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
