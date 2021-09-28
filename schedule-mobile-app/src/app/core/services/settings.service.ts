import {Injectable, OnInit} from '@angular/core';
import {Storage} from '@ionic/storage-angular';
import {Settings} from '../../shared/models/settings.model';
import {defaultSettings} from '../../shared/models/default-settings';
import {LogService} from './log.service';
import {TabSettings} from '../../shared/models/tab-settings';
import {ToastService} from './toast.service';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private settings: Settings;


  constructor(private storage: Storage,
              private logService: LogService,
              private toastService: ToastService) {
  }

  async init(): Promise<void> {
    await this.storage.create();

    this.storage.get('settings').then((settings) => {
      this.settings = JSON.parse(JSON.stringify(settings));

      this.settings.tabSettings = this.settings.tabSettings.map((tab, index) => {
        return tab.id === undefined ? {...defaultSettings.tabSettings[index]} : tab;
      })

      if (!settings) {
        this.resetToDefault();
      }
    }).catch((error) => {
      this.toastService.presentError(`Error while reading settings from file system, error: ${error}`);
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
      this.toastService.presentError(`Error while saving settings, error: ${error}`)
      this.logService.error(`Error while saving settings, error: ${error}`);
    });
  }

  getTabSettings(tabId: number): TabSettings {
    this.settings.tabSettings[tabId] = this.settings.tabSettings[tabId] || {...defaultSettings.tabSettings[tabId]};
    return this.settings.tabSettings[tabId];
  }

  setTabSettings(tabId: number, tabSettings: TabSettings): void {
    this.settings.tabSettings[tabId] = tabSettings;

    this.setSettings(this.settings);
  }

  resetToDefault(): void {
    this.settings = JSON.parse(JSON.stringify(defaultSettings));
  }
}
