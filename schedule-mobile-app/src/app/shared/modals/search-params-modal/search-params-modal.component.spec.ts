import { ComponentFixture, TestBed } from '@angular/core/testing';
import {SearchParamsModalComponent} from './search-params-modal.component';

describe('EditSearchParamsModalComponent', () => {
  let component: SearchParamsModalComponent;
  let fixture: ComponentFixture<SearchParamsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchParamsModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchParamsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
