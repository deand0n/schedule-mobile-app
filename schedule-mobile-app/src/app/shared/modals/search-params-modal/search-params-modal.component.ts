import {Component, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';

@Component({
  selector: 'edit-search-params-modal',
  templateUrl: './search-params-modal.component.html',
  styleUrls: ['./search-params-modal.component.scss']
})
export class SearchParamsModalComponent implements OnInit {

  constructor(private modalController: ModalController) {
  }

  ngOnInit(): void {
  }

  async closeModal() {
    await this.modalController.dismiss();
  }
}
