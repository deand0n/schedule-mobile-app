import {Component, OnInit} from '@angular/core';
import {SettingsService} from '../../core/services/settings.service';
import {TabSettings} from '../../shared/models/tab-settings';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-tab-settings',
  templateUrl: './tab-settings.page.html',
  styleUrls: ['./tab-settings.page.scss'],
})
export class TabSettingsPage implements OnInit {

  tabId: number;
  tabSettings: TabSettings;

  constructor(private settingsService: SettingsService,
              private router: ActivatedRoute) {
  }

  ngOnInit() {
    this.tabId = this.router.snapshot.params.id;

    this.tabSettings = this.settingsService.getTabSettings(this.tabId);
  }

}
