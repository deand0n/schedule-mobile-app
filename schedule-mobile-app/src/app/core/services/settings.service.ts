import {Injectable, OnInit} from '@angular/core';
import {Storage} from '@ionic/storage-angular';
import {Settings} from '../../shared/models/settings.model';
import {defaultSettings} from '../../shared/models/default-settings';
import {LogService} from './log.service';
import {TabSettings} from '../../shared/models/tab-settings';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private settings: Settings;


  constructor(private storage: Storage,
              private logService: LogService) {
  }

  async init(): Promise<void> {
    await this.storage.create();

    this.storage.get('settings').then((settings) => {
      this.settings = {...settings};

      if (!settings) {
        this.resetToDefault();
      }
    }).catch((error) => {
      this.logService.error(`Error while reading settings from file system, error: ${error}`);
    });
  }

  getSettings(): Settings {
    return this.settings;
  }

  setSettings(settings: Settings): void {
    this.storage.set('settings', settings).then((settings) => {
      this.settings = settings;
    }).catch((error) => {
      this.logService.error(`Error while saving settings, error: ${error}`);
    });
  }

  getTabSettings(tabId: number): TabSettings {
    return this.settings.tabSettings[tabId];
  }

  setTabSettings(tabId: number, tabSettings: TabSettings): void {
    this.settings.tabSettings[tabId] = tabSettings;

    this.setSettings(this.settings);
  }

  resetToDefault(): void {
    this.settings = {...defaultSettings};
  }
}
