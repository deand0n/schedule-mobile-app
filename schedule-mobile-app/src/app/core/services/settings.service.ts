import {Injectable, OnInit} from '@angular/core';
import {Storage} from '@ionic/storage-angular';
import {Settings} from '../../shared/models/settings.model';
import {defaultSettings} from '../../shared/models/default-settings';
import {LogService} from './log.service';
import {TabSettings} from '../../shared/models/tab-settings';
import {ToastService} from './toast.service';
import {clone, cloneDeep} from 'lodash-es';
import {SearchParams} from '../../shared/models/search-params.model';

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

    this.storage.get('settings').then(async (settings) => {
      this.settings = settings;

      if (!settings) {
        await this.resetToDefault();
      }

      this.settings.tabSettings = this.settings.tabSettings.map((tab, index) => {
        return tab.id === undefined ? {...defaultSettings.tabSettings[index]} : tab;
      });
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
      this.toastService.presentError(`Помилка під час збереження налаштувань, error: ${error}`);
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

  getSearchParams(tabId: number): SearchParams[] {
    return this.settings.tabSettings[tabId].searchParams;
  }

  setSearchParams(tabId: number, searchParams: SearchParams[]): void {
    this.settings.tabSettings[tabId].searchParams = searchParams;

    this.setTabSettings(tabId, this.settings.tabSettings[tabId]);
  }


  async resetToDefault(): Promise<void> {
    try {
      this.settings = cloneDeep(await this.storage.set('settings', defaultSettings));
    } catch (error) {
      this.toastService.presentError(`Помилка під час відновлення налаштувань`);
      this.logService.error(`Error while resetting settings, error: ${error}`);
    }
  }
}
