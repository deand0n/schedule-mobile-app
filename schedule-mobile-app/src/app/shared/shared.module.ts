import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import { EditSearchParamsModalComponent } from './modals/edit-search-params-modal/edit-search-params-modal.component';


@NgModule({
  declarations: [
    EditSearchParamsModalComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    IonicModule
  ]
})
export class SharedModule {
}
