import {Component, Input, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {SettingsService} from '../../../core/services/settings.service';
import {TabSettings} from '../../models/tab-settings';
import {SearchParams} from '../../models/search-params.model';

@Component({
  selector: 'search-params-modal',
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
    this.tabSettings = this.settingsService.getTabSettings(this.tabId);
  }

  async closeModal(): Promise<void> {
    await this.modalController.dismiss({
      dismissed: true,
    });
  }

  addSearchParams(): void {
    const lastElementId = this.tabSettings.searchParams[this.tabSettings.searchParams.length - 1]?.id || 0;
    this.tabSettings.searchParams.push(new SearchParams(lastElementId + 1));
  }

  saveSearchParams(searchParams: SearchParams): void {
    const params = this.tabSettings.searchParams.find((params) => params.id === searchParams.id)
    Object.assign(params, searchParams);

    this.settingsService.setTabSettings(this.tabId, this.tabSettings);
  }

  removeSearchParams(searchParams: SearchParams): void {
    const params = this.tabSettings.searchParams.find((params) => params.id === searchParams.id)
    this.tabSettings.searchParams.splice(this.tabSettings.searchParams.indexOf(params), 1);

    this.settingsService.setTabSettings(this.tabId, this.tabSettings);
  }
}
