import {Component, OnInit} from '@angular/core';
import {SettingsService} from '../core/services/settings.service';
import {Settings} from '../shared/models/settings.model';
import {TabSettings} from '../shared/models/tab-settings';
import {ModalController, NavController} from '@ionic/angular';
import {TabSettingsComponent} from '../shared/modals/tab-settings/tab-settings.component';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  settings: Settings;

  constructor(private settingsService: SettingsService,
              private modalController: ModalController) {
  }

  ngOnInit() {
    this.settings = this.settingsService.getSettings();
  }

  async presentModal(tabSettings: TabSettings) {
    const modal = await this.modalController.create({
      component: TabSettingsComponent,
      cssClass: 'tab-settings-modal',
      animated: true,
      swipeToClose: true,
      componentProps: {
        tabSettings: tabSettings,
      }
    });

    await modal.present();
  }
}
