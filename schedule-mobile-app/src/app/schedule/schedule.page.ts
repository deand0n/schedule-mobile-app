import {Component, Input, OnInit} from '@angular/core';
import {Day} from './models/day.model';
import {ModalController} from '@ionic/angular';
import {SearchParamsModalComponent} from '../shared/modals/search-params-modal/search-params-modal.component';
import {TabSettings} from '../shared/models/tab-settings';
import {ActivatedRoute} from '@angular/router';
import {SettingsService} from '../core/services/settings.service';
import {ScheduleService} from '../core/services/schedule.service';
import {ToastService} from '../core/services/toast.service';
import {OverlayEventDetail} from '@ionic/core';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.page.html',
  styleUrls: ['./schedule.page.scss'],
})
export class SchedulePage implements OnInit {

  days: Day[] = [];

  tabSettings: TabSettings;
  tabId: number;


  constructor(private modalController: ModalController,
              private route: ActivatedRoute,
              private scheduleService: ScheduleService,
              private settingsService: SettingsService) {
  }

  ngOnInit() {
    this.tabId = +this.route.snapshot.paramMap.get('id');
    this.tabSettings = this.settingsService.getTabSettings(this.tabId);

    this.scheduleService.getSchedule(this.tabSettings.searchParams).subscribe((next) => {
      this.days = next;
    });
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: SearchParamsModalComponent,
      animated: true,
      swipeToClose: true,
      componentProps: {
        tabId: this.route.snapshot.paramMap.get('id')
      }
    });

    await modal.present();

    modal.onDidDismiss().then((overlayEventDetail) => {
      this.tabSettings = overlayEventDetail.data.tabSettings;
      this.scheduleService.getSchedule(this.tabSettings.searchParams).subscribe((next) => {
        this.days = next;
      });
    });
  }
}
