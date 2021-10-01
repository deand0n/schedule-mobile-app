import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {EditSearchParamsComponent} from './modals/search-params-modal/components/edit-search-params/edit-search-params.component';
import {SearchParamsModalComponent} from './modals/search-params-modal/search-params-modal.component';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import {TabSettingsComponent} from './modals/tab-settings/tab-settings.component';
import {IconPickerComponent} from './components/icon-picker/icon-picker.component';


@NgModule({
  declarations: [
    SearchParamsModalComponent,
    EditSearchParamsComponent,
    TabSettingsComponent,
    IconPickerComponent
  ],
  imports: [
    CommonModule,
    AutocompleteLibModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule
  ],
})
export class SharedModule {
}
