import { NgModule } from '@angular/core';

import { TabsPageRoutingModule } from './tabs-routing.module';

import { TabsPage } from './tabs.page';
import {SharedModule} from '../shared/shared.module';
import {RouterModule} from '@angular/router';

@NgModule({
  imports: [
    SharedModule,
    TabsPageRoutingModule,
    RouterModule
  ],
  declarations: [TabsPage]
})
export class TabsPageModule {}
