import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {SettingsPage} from './settings.page';

const routes: Routes = [
  {
    path: '',
    component: SettingsPage
  },
  {
    path: 'tab-settings/:id',
    loadChildren: () => import('./tab-settings/tab-settings.module').then(m => m.TabSettingsPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingsPageRoutingModule {
}
