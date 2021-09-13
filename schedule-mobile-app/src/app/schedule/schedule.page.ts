import {Component, OnInit} from '@angular/core';
import {Day} from './models/day.model';
import {ModalController} from '@ionic/angular';
import {EditSearchParamsModalComponent} from '../shared/modals/edit-search-params-modal/edit-search-params-modal.component';

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


  constructor(private modalController: ModalController) {
  }

  ngOnInit() {
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: EditSearchParamsModalComponent,
      swipeToClose: true
    });
    return await modal.present();
  }

}
