import {Injectable, OnInit} from '@angular/core';
import {Storage} from '@ionic/storage';
import {Settings} from '../../shared/models/settings.model';

@Injectable({
  providedIn: 'root'
})
export class SettingsService implements OnInit {

  private _settings: Settings;



  constructor(private storage: Storage) {
  }

  ngOnInit(): void {
    this.storage.get('settings').then((settings) => {
      this._settings = settings;
    })
  }

  // getSettings(): Settings {
  //   this.storage.get('settings').then((settings) => {
  //     return settings;
  //   });
  // }

  resetToDefault(): void {

  }
}
