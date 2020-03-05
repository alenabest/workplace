import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';

import { CustomHttpInterceptor } from './core/custom-http-interceptor';
import { AppDateAdapter, MAT_DATE_FNS_DATE_FORMATS } from './app-date-adapter';
import { CoreComponentsModule } from './core/components';
import { StartupService } from './core/services/startup';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ActivityModule } from './activity';
import { SettingsModule } from './settings';
import { ProfileModule } from './profile';
import { ReportsModule } from './reports';
import { LoginModule } from './login';
import { UsersModule } from './users';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';


export function startupServiceFactory(startupService: StartupService) {
  return () => startupService.initializeApp();
}

const modules = [
  CoreComponentsModule,

  LoginModule,
  ProfileModule,
  SettingsModule,
  ActivityModule,
  ReportsModule,
  UsersModule
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
    FlexModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
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
