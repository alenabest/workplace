import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';

import { CustomHttpInterceptor } from './core/custom-http-interceptor';
import { AppDateAdapter, MAT_DATE_FNS_DATE_FORMATS } from './app-date-adapter';
import { AppRoutingModule } from './app-routing.module';
import { AppStartService } from './app-start.service';
import { AppComponent } from './app.component';
import { ActivityModule } from './activity';
import { SettingsModule } from './settings';
import { ProfileModule } from './profile';
import { SidebarModule } from './sidebar';
import { HeaderModule } from './header';
import { LoginModule } from './login';
import { UsersModule } from './users';


export function startupServiceFactory(startupService: AppStartService) {
  return () => startupService.initializeApp();
}

const modules = [
  HeaderModule,
  SidebarModule,

  LoginModule,
  ProfileModule,
  SettingsModule,
  ActivityModule,
  UsersModule,
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
    FlexModule
  ],
  providers: [
    AppStartService,
    { provide: APP_INITIALIZER, useFactory: startupServiceFactory, deps: [AppStartService], multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: CustomHttpInterceptor, multi: true },
    { provide: DateAdapter, useClass: AppDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: MAT_DATE_FNS_DATE_FORMATS }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
