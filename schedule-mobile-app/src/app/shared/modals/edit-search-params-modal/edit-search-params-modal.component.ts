import { Component, OnInit } from '@angular/core';
import {ModalController} from '@ionic/angular';

@Component({
  selector: 'app-edit-search-params-modal',
  templateUrl: './edit-search-params-modal.component.html',
  styleUrls: ['./edit-search-params-modal.component.css']
})
export class EditSearchParamsModalComponent implements OnInit {

  isVisible = false;

  constructor(private modalController: ModalController) { }

  ngOnInit(): void {
  }

  async closeModal() {
    await this.modalController.dismiss();
  }

  test() {
    console.log(this.isVisible)
    this.isVisible = !this.isVisible;
  }

}
