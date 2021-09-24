import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SearchParams} from '../../../../models/search-params.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ToastController} from '@ionic/angular';
import {debounceTime} from 'rxjs/operators';
import {ScheduleService} from '../../../../../core/services/schedule.service';

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
  groupsAutocomplete: string[] = [];
  teachersAutocomplete: string[] = [];

  constructor(private formBuilder: FormBuilder,
              private toastController: ToastController,
              private scheduleService: ScheduleService) {
    this.searchParamsForm = this.formBuilder.group({
      group: ['', []],
      teacher: ['', []],
      from: ['', [Validators.required]],
      to: ['', [Validators.required]],
      isForMonth: ['', [Validators.required]]
    })
  }

  ngOnInit(): void {
    this.searchParamsForm.patchValue({
      group: this.searchParams?.group,
      teacher: this.searchParams?.teacher,
      from: this.searchParams?.startDate,
      to: this.searchParams?.endDate,
      isForMonth: this.searchParams?.isForMonth
    });

    this.scheduleService.getGroupAutocomplete('').subscribe((groups) => {
      this.groupsAutocomplete = groups;
    });

    this.scheduleService.getTeacherAutocomplete('').subscribe((teachers) => {
      this.teachersAutocomplete = teachers;
    });

    this.toggleDateFields(this.searchParams.isForMonth);
  }

  saveSearchParams(): void {
    if (this.searchParamsForm.invalid) {
      this.searchParamsForm.markAllAsTouched();
      this.presentToastError('Введіть корректні дані');
      return;
    }

    if (!this.searchParamsForm.get('group').value && !this.searchParamsForm.get('teacher').value) {
      this.presentToastError('Введіть назву групи або прізвище викладача')
      return;
    }

    this.searchParams = {...this.searchParams, ...this.searchParamsForm.value}
    this.onSave.emit(this.searchParams);
  }

  removeSearchParams(): void {
    this.searchParams = {...this.searchParams, ...this.searchParamsForm.value}
    this.onRemove.emit(this.searchParams);
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

  async presentToastError(message: string): Promise<void> {
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

  keyword = 'name';
  public countries = [
    {
      id: 1,
      name: 'Albania',
    },
    {
      id: 2,
      name: 'Belgium',
    },
    {
      id: 3,
      name: 'Denmark',
    },
    {
      id: 4,
      name: 'Montenegro',
    },
    {
      id: 5,
      name: 'Turkey',
    },
    {
      id: 6,
      name: 'Ukraine',
    },
    {
      id: 7,
      name: 'Macedonia',
    },
    {
      id: 8,
      name: 'Slovenia',
    },
    {
      id: 9,
      name: 'Georgia',
    },
    {
      id: 10,
      name: 'India',
    },
    {
      id: 11,
      name: 'Russia',
    },
    {
      id: 12,
      name: 'Switzerland',
    }
  ];
}
