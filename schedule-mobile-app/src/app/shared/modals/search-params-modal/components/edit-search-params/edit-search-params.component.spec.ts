import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSearchParamsComponent } from './edit-search-params.component';

describe('EditSearchParamsComponent', () => {
  let component: EditSearchParamsComponent;
  let fixture: ComponentFixture<EditSearchParamsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditSearchParamsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSearchParamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
