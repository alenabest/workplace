import { NgModule } from '@angular/core';

import { MaterialModules } from '../material.modules';
import { SidebarComponent } from './sidebar';
import { CoreModule } from '../core.module';
import { HeaderComponent } from './header';


const components = [
  HeaderComponent,
  SidebarComponent
];

@NgModule({
  declarations: [components],
  imports: [
    CoreModule,
    MaterialModules
  ],
  exports: [components]
})

export class CoreComponentsModule {
}
