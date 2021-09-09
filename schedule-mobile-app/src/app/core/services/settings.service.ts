import {Injectable, OnInit} from '@angular/core';
import {Storage} from '@ionic/storage';
import {Settings} from '../../shared/models/settings.model';
import {defaultSettings} from '../../shared/models/default-settings';
import {LogService} from './log.service';

@Injectable({
  providedIn: 'root'
})
export class SettingsService implements OnInit {

  private _settings: Settings;


  constructor(private storage: Storage,
              private logService: LogService) {
  }

  ngOnInit(): void {
    this.storage.get('settings').then((settings) => {
      this._settings = settings;

      if (!settings)
        this.resetToDefault();
    }).catch((error) => {
      this.logService.error(`Error while reading settings from file system, error: ${error}`)
    })
  }

  getSettings(): Settings {
    return this._settings;
  }

  setSettings(settings: Settings): void {
    this.storage.set('settings', settings).then((settings) => {
      this._settings = settings;
    }).catch((error) => {
      this.logService.error(`Error while saving settings, error: ${error}`);
    });
  }

  resetToDefault(): void {
    this._settings = {...defaultSettings};
  }
}
