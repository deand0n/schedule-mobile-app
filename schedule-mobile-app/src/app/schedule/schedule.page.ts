import {Component, Input, OnInit} from '@angular/core';
import {Day} from './models/day.model';
import {ModalController} from '@ionic/angular';
import {SearchParamsModalComponent} from '../shared/modals/search-params-modal/search-params-modal.component';
import {TabSettings} from '../shared/models/tab-settings';
import {ActivatedRoute} from '@angular/router';
import {SettingsService} from '../core/services/settings.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.page.html',
  styleUrls: ['./schedule.page.scss'],
})
export class SchedulePage implements OnInit {

  days: Day[] = [
    {
      name: 'Monday',
      date: new Date(),
      lessons: [
        {
          order: 2,
          time: '10:00-11:20',
          type: '(L)',
          name: 'English',
          groups: 'PZ'
        },
        {
          order: 2,
          time: '10:00-11:20',
          type: '(Lab)',
          name: 'Biology',
          groups: 'BK'
        },
        {
          order: 2,
          time: '10:00-11:20',
          type: '(L)',
          name: 'Math',
          groups: 'KN'
        },
        {
          order: 3,
          time: '11:50-13:10',
          type: '(PRS)',
          name: 'Computer Science',
          groups: 'PZ'
        }
      ]
    },
    {
      name: 'Tuesday',
      date: new Date(),lessons: [
        {
          order: 2,
          time: '10:00-11:20',
          type: '(L)',
          name: 'English',
          groups: 'PZ'
        },
        {
          order: 2,
          time: '10:00-11:20',
          type: '(Lab)',
          name: 'Biology',
          groups: 'BK'
        },
        {
          order: 2,
          time: '10:00-11:20',
          type: '(L)',
          name: 'Math',
          groups: 'KN'
        },
        {
          order: 3,
          time: '11:50-13:10',
          type: '(PRS)',
          name: 'Computer Science',
          groups: 'PZ'
        }
      ]
    }
  ]


  constructor(private modalController: ModalController,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: SearchParamsModalComponent,
      swipeToClose: true,
      componentProps: {
        tabId: this.route.snapshot.paramMap.get('id')
      }

    });
    return await modal.present();
  }

}
