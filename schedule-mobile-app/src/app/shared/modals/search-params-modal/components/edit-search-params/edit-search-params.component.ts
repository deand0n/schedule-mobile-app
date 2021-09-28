import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SearchParams} from '../../../../models/search-params.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ScheduleService} from '../../../../../core/services/schedule.service';
import {ToastService} from '../../../../../core/services/toast.service';

@Component({
  selector: 'edit-search-params',
  templateUrl: './edit-search-params.component.html',
  styleUrls: ['./edit-search-params.component.scss']
})
export class EditSearchParamsComponent implements OnInit {

  @Input() searchParams: SearchParams;
  @Output() save = new EventEmitter<SearchParams>();
  @Output() remove = new EventEmitter<SearchParams>();

  searchParamsForm: FormGroup;
  groupsAutocomplete: string[] = [];
  teachersAutocomplete: string[] = [];

  constructor(private formBuilder: FormBuilder,
              private scheduleService: ScheduleService,
              private toastService: ToastService) {
    this.searchParamsForm = this.formBuilder.group({
      group: ['', []],
      teacher: ['', []],
      from: ['', [Validators.required]],
      to: ['', [Validators.required]],
      isForMonth: ['', [Validators.required]]
    })
  }

  async ngOnInit() {
    this.searchParamsForm.patchValue({
      group: this.searchParams?.group,
      teacher: this.searchParams?.teacher,
      from: this.searchParams?.startDate,
      to: this.searchParams?.endDate,
      isForMonth: this.searchParams?.isForMonth
    });

    // this.groupsAutocomplete = (await this.scheduleService.getGroupAutocomplete('')).data
    this.scheduleService.getGroupAutocomplete('').subscribe((groups) => {
      this.groupsAutocomplete = groups;
    });

    // this.teachersAutocomplete = (await this.scheduleService.getTeacherAutocomplete('')).data
    this.scheduleService.getTeacherAutocomplete('').subscribe((teachers) => {
      this.teachersAutocomplete = teachers;
    });

    this.toggleDateFields(this.searchParams.isForMonth);
  }

  saveSearchParams(): void {
    if (this.searchParamsForm.invalid) {
      this.searchParamsForm.markAllAsTouched();
      this.toastService.presentError('Введіть корректні дані');
      return;
    }

    if (!this.searchParamsForm.get('group').value && !this.searchParamsForm.get('teacher').value) {
      this.toastService.presentError('Введіть назву групи або прізвище викладача');
      return;
    }

    this.searchParams = {...this.searchParams, ...this.searchParamsForm.value}
    this.save.emit(this.searchParams);
  }

  removeSearchParams(): void {
    this.searchParams = {...this.searchParams, ...this.searchParamsForm.value}
    this.remove.emit(this.searchParams);
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
