import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SearchParams } from '../../../../models/search-params.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ScheduleService } from '../../../../../core/services/schedule.service';
import { ToastService } from '../../../../../core/services/toast.service';

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
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
      isForMonth: [false, []]
    });
  }

  async ngOnInit() {
    this.searchParamsForm.patchValue({
      group: this.searchParams?.group,
      teacher: this.searchParams?.teacher,
      startDate: this.searchParams?.startDate,
      endDate: this.searchParams?.endDate,
      isForMonth: this.searchParams?.isForMonth
    });

    this.groupsAutocomplete = this.scheduleService.groups;
    this.teachersAutocomplete = this.scheduleService.teachers;

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

    this.searchParams = { ...this.searchParams, ...this.searchParamsForm.value }
    this.toastService.presentSuccess('Параметри були успішно збережені');
    this.save.emit(this.searchParams);
  }

  removeSearchParams(): void {
    this.searchParams = { ...this.searchParams, ...this.searchParamsForm.value }
    this.remove.emit(this.searchParams);
  }

  toggleDateFields(isEnabled: boolean): void {
    if (isEnabled) {
      this.searchParamsForm.get('startDate').disable();
      this.searchParamsForm.get('endDate').disable();
    } else {
      this.searchParamsForm.get('startDate').enable();
      this.searchParamsForm.get('endDate').enable();
    }
  }
}
