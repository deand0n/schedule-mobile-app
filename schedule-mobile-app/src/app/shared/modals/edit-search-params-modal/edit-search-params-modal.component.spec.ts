import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSearchParamsModalComponent } from './edit-search-params-modal.component';

describe('EditSearchParamsModalComponent', () => {
  let component: EditSearchParamsModalComponent;
  let fixture: ComponentFixture<EditSearchParamsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditSearchParamsModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSearchParamsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
