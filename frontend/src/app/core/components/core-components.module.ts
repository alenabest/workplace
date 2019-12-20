import { NgModule } from '@angular/core';
import { CoreModule } from '../core.module';
import { MaterialModules } from '../material.modules';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';


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
