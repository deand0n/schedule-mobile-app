import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SettingsService} from './services/settings.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
  exports: [],
  providers: [SettingsService]
})
export class CoreModule { }
