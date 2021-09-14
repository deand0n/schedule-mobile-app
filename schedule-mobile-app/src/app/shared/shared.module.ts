import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import { EditSearchParamsComponent } from './modals/search-params-modal/components/edit-search-params/edit-search-params.component';
import {SearchParamsModalComponent} from './modals/search-params-modal/search-params-modal.component';


@NgModule({
  declarations: [
    SearchParamsModalComponent,
    EditSearchParamsComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    IonicModule
  ],
})
export class SharedModule {
}
