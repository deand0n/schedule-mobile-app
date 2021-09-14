import {Component, Input, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {SettingsService} from '../../../core/services/settings.service';
import {Settings} from '../../models/settings.model';
import {TabSettings} from '../../models/tab-settings';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'edit-search-params-modal',
  templateUrl: './search-params-modal.component.html',
  styleUrls: ['./search-params-modal.component.scss']
})
export class SearchParamsModalComponent implements OnInit {

  @Input() tabId: number;
  tabSettings: TabSettings;

  constructor(private modalController: ModalController,
              private settingsService: SettingsService) {
  }

  ngOnInit(): void {
    console.log(this.tabId)
    this.tabSettings = this.settingsService.getSettings().tabSettings[this.tabId];
    console.log(this.tabSettings)
  }

  async closeModal() {
    await this.modalController.dismiss();
  }
}
