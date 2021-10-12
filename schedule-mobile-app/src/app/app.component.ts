import { Component } from '@angular/core';
import { SettingsService } from './core/services/settings.service';
import { ScheduleService } from './core/services/schedule.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private settingsService: SettingsService,
    private scheduleService: ScheduleService
  ) {
    this.settingsService.init();
    this.scheduleService.init();
  }
}
