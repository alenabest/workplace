import { NgModule } from '@angular/core';

import { ActivityMenuComponent } from './activity-menu/activity-menu.component';
import { CoreModule } from '../../core';

const components = [
  ActivityMenuComponent
];

@NgModule({
  declarations: [components],
  imports: [
    CoreModule
  ],
  exports: [components]
})

export class ActivityComponentsModule {}

