import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import * as dayJs from 'dayjs';

import { CoreComponentsModule } from './core/components/core-components.module';
import { CustomHttpInterceptor } from './core/custom-http-interceptor';
import { SettingsModule } from './settings/settings.module';
import { StartupService } from './core/services/startup';
import { ProfileModule } from './profile/profile.module';
import { AppRoutingModule } from './app-routing.module';
import { LoginModule } from './login/login.module';
import { AppComponent } from './app.component';

dayJs.locale('ru');

export function startupServiceFactory(startupService: StartupService) {
  return () => startupService.initializeApp();
}

const modules = [
  CoreComponentsModule,

  LoginModule,
  ProfileModule,
  SettingsModule
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    modules,

    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientXsrfModule.withOptions({
      cookieName: 'csrftoken',
      headerName: 'x-csrftoken'
    }),
    BrowserAnimationsModule
  ],
  providers: [
    StartupService,
    { provide: APP_INITIALIZER, useFactory: startupServiceFactory, deps: [StartupService], multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: CustomHttpInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
