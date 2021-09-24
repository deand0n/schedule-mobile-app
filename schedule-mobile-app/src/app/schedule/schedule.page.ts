import {Component, Input, OnInit} from '@angular/core';
import {Day} from './models/day.model';
import {ModalController} from '@ionic/angular';
import {SearchParamsModalComponent} from '../shared/modals/search-params-modal/search-params-modal.component';
import {TabSettings} from '../shared/models/tab-settings';
import {ActivatedRoute} from '@angular/router';
import {SettingsService} from '../core/services/settings.service';
import {ScheduleService} from '../core/services/schedule.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.page.html',
  styleUrls: ['./schedule.page.scss'],
})
export class SchedulePage implements OnInit {

  // days: Day[] = [
  //   {
  //     name: 'Monday',
  //     date: new Date(),
  //     lessons: [
  //       {
  //         order: 2,
  //         time: '10:00-11:20',
  //         type: '(L)',
  //         name: 'English',
  //         groups: 'PZ'
  //       },
  //       {
  //         order: 2,
  //         time: '10:00-11:20',
  //         type: '(Lab)',
  //         name: 'Biology',
  //         groups: 'BK'
  //       },
  //       {
  //         order: 2,
  //         time: '10:00-11:20',
  //         type: '(L)',
  //         name: 'Math',
  //         groups: 'KN'
  //       },
  //       {
  //         order: 3,
  //         time: '11:50-13:10',
  //         type: '(PRS)',
  //         name: 'Computer Science',
  //         groups: 'PZ'
  //       }
  //     ]
  //   },
  //   {
  //     name: 'Tuesday',
  //     date: new Date(), lessons: [
  //       {
  //         order: 2,
  //         time: '10:00-11:20',
  //         type: '(L)',
  //         name: 'English',
  //         groups: 'PZ'
  //       },
  //       {
  //         order: 2,
  //         time: '10:00-11:20',
  //         type: '(Lab)',
  //         name: 'Biology',
  //         groups: 'BK'
  //       },
  //       {
  //         order: 2,
  //         time: '10:00-11:20',
  //         type: '(L)',
  //         name: 'Math',
  //         groups: 'KN'
  //       },
  //       {
  //         order: 3,
  //         time: '11:50-13:10',
  //         type: '(PRS)',
  //         name: 'Computer Science',
  //         groups: 'PZ'
  //       }
  //     ]
  //   }
  // ]
  days: Day[] = [];

  tabSettings: TabSettings;
  tabId: number;


  constructor(private modalController: ModalController,
              private route: ActivatedRoute,
              private scheduleService: ScheduleService,
              private settingsService: SettingsService,) {
  }

  ngOnInit() {
    this.tabId = +this.route.snapshot.paramMap.get('id');
    this.tabSettings = this.settingsService.getTabSettings(this.tabId);

    this.scheduleService.getSchedule(this.tabSettings.searchParams).subscribe((next) => {
      this.days = next;
      console.log(next);
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

    // const {data} = await modal.onWillDismiss();
    const a = await modal.onWillDismiss();
    console.log('asdfasdfasd')
    // console.log(data);
    console.log(a.data)
  }

}
