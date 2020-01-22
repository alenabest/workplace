import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material';
import { APP_INITIALIZER, NgModule } from '@angular/core';

import { CoreComponentsModule } from './core/components/core-components.module';
import { CustomHttpInterceptor } from './core/custom-http-interceptor';
import { AppDateAdapter, MAT_DATE_FNS_DATE_FORMATS } from './app-date-adapter';
import { ServiceWorkerModule } from '@angular/service-worker';
import { ActivityModule } from './activity/activity.module';
import { SettingsModule } from './settings/settings.module';
import { environment } from '../environments/environment';
import { StartupService } from './core/services/startup';
import { ProfileModule } from './profile/profile.module';
import { AppRoutingModule } from './app-routing.module';
import { LoginModule } from './login/login.module';
import { AppComponent } from './app.component';
import { FlexModule } from '@angular/flex-layout';


export function startupServiceFactory(startupService: StartupService) {
  return () => startupService.initializeApp();
}

const modules = [
  CoreComponentsModule,

  LoginModule,
  ProfileModule,
  SettingsModule,
  ActivityModule
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
    BrowserAnimationsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    FlexModule
  ],
  providers: [
    StartupService,
    { provide: APP_INITIALIZER, useFactory: startupServiceFactory, deps: [StartupService], multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: CustomHttpInterceptor, multi: true },
    { provide: DateAdapter, useClass: AppDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: MAT_DATE_FNS_DATE_FORMATS }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
