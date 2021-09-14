import {Component, OnInit} from '@angular/core';
import {SettingsService} from '../core/services/settings.service';
import {Settings} from '../shared/models/settings.model';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit{

  settings: Settings;

  constructor(private settingsService: SettingsService) {}

  ngOnInit() {
    this.settings = this.settingsService.getSettings();
  }
}
