import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SearchParams} from '../../../../models/search-params.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ToastController} from '@ionic/angular';

@Component({
  selector: 'edit-search-params',
  templateUrl: './edit-search-params.component.html',
  styleUrls: ['./edit-search-params.component.scss']
})
export class EditSearchParamsComponent implements OnInit {

  @Input() searchParams: SearchParams;
  @Output() onSave = new EventEmitter<SearchParams>();
  @Output() onRemove = new EventEmitter<SearchParams>();

  searchParamsForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private toastController: ToastController) {
    this.searchParamsForm = this.formBuilder.group({
      group: ['', [Validators.required]],
      teacher: ['', [Validators.required]],
      from: ['', [Validators.required]],
      to: ['', [Validators.required]],
      isForMonth: ['', [Validators.required]]
    })
  }

  ngOnInit(): void {
    this.searchParamsForm.patchValue({
      group: this.searchParams?.group,
      teacher: this.searchParams?.teacher,
      from: this.searchParams?.from,
      to: this.searchParams?.to,
      isForMonth: this.searchParams?.isForMonth
    })

    this.toggleDateFields(this.searchParams.isForMonth);
  }

  saveSearchParams(): void {
    if (this.searchParamsForm.invalid) {
      this.searchParamsForm.markAllAsTouched();
      this.presentToast();
      return;
    }

    this.searchParams = {...this.searchParams, ...this.searchParamsForm.value}
    this.onSave.emit(this.searchParams);
  }

  removeSearchParams(): void {
    this.searchParams = {...this.searchParams, ...this.searchParamsForm.value}
    this.onRemove.emit(this.searchParams);
  }

  async presentToast(): Promise<void> {
    let toast = await this.toastController.create({
      message: 'Введіть корректні дані',
      duration: 5000
    })

    await toast.present();
  }

  toggleDateFields(isEnabled: boolean): void {
    if (isEnabled) {
      this.searchParamsForm.get('from').disable();
      this.searchParamsForm.get('to').disable();
    } else {
      this.searchParamsForm.get('from').enable();
      this.searchParamsForm.get('to').enable();
    }
  }
}
