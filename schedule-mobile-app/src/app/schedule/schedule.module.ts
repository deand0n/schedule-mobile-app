import { NgModule } from '@angular/core';
import { SchedulePageRoutingModule } from './schedule-routing.module';
import { SchedulePage } from './schedule.page';
import { DayComponent } from './components/day/day.component';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    SchedulePageRoutingModule
  ],
  declarations: [SchedulePage, DayComponent]
})
export class SchedulePageModule {}
