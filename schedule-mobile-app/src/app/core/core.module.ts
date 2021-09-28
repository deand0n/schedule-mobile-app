import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SettingsService} from './services/settings.service';
import {HTTP_INTERCEPTORS, HttpBackend, HttpClientModule, HttpXhrBackend} from '@angular/common/http';
import {ErrorInterceptor} from './services/error.interceptor';
import {NativeHttpBackend, NativeHttpFallback, NativeHttpModule} from 'ionic-native-http-connection-backend';
import {Platform} from '@ionic/angular';


@NgModule({
  declarations: [],
  imports: [
    CommonModule, HttpClientModule, NativeHttpModule
  ],
  exports: [],
  providers: [
    SettingsService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    },
    {
      provide: HttpBackend,
      useClass: NativeHttpFallback,
      deps: [Platform, NativeHttpBackend, HttpXhrBackend]}
  ]
})
export class CoreModule {
}
