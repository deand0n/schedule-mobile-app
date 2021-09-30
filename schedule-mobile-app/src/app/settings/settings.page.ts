import {Component, OnInit} from '@angular/core';
import {SettingsService} from '../core/services/settings.service';
import {Settings} from '../shared/models/settings.model';
import {TabSettings} from '../shared/models/tab-settings';
import {NavController} from '@ionic/angular';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  settings: Settings;

  constructor(private settingsService: SettingsService,
              private navController: NavController) {
  }

  ngOnInit() {
    this.settings = this.settingsService.getSettings();
  }

  goToTabSettings(tabId: number) {
    this.navController.navigateForward(`settings/tab-settings/${tabId}`);
  }
}
