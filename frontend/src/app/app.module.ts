import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { Platform } from '@angular/cdk/platform';

import { CoreComponentsModule } from './core/components/core-components.module';
import { CustomHttpInterceptor } from './core/custom-http-interceptor';
import { AppDateAdapter, AppDateFormat } from './app-date-adapter';
import { ServiceWorkerModule } from '@angular/service-worker';
import { SettingsModule } from './settings/settings.module';
import { environment } from '../environments/environment';
import { StartupService } from './core/services/startup';
import { ProfileModule } from './profile/profile.module';
import { AppRoutingModule } from './app-routing.module';
import { LoginModule } from './login/login.module';
import { AppComponent } from './app.component';
import * as dayJs from 'dayjs';


export function startupServiceFactory(startupService: StartupService) {
  return () => startupService.initializeApp();
}


dayJs.locale('ru');
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
    BrowserAnimationsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    StartupService,
    { provide: APP_INITIALIZER, useFactory: startupServiceFactory, deps: [StartupService], multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: CustomHttpInterceptor, multi: true },
    { provide: DateAdapter, useClass: AppDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: AppDateFormat }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
