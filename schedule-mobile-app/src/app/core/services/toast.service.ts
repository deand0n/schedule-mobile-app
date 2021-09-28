import {Injectable} from '@angular/core';
import {ToastController} from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toastController: ToastController) {
  }

  async presentError(message: string): Promise<void> {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      color: 'danger',
      buttons: [
        {
          text: 'OK',
          role: 'cancel',
        }
      ]
    });

    await toast.present();
  }

  async presentSuccess(message: string): Promise<void> {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      color: 'success',
      buttons: [
        {
          text: 'OK',
          role: 'cancel',
        }
      ]
    });

    await toast.present();
  }
}
