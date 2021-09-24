import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SettingsService} from './services/settings.service';
import {HttpClientModule} from '@angular/common/http';


@NgModule({
  declarations: [],
  imports: [
    CommonModule, HttpClientModule
  ],
  exports: [],
  providers: [SettingsService]
})
export class CoreModule {
}
