import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthActivityCardComponent } from './month-activity-card.component';

describe('MonthActivityCardComponent', () => {
  let component: MonthActivityCardComponent;
  let fixture: ComponentFixture<MonthActivityCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonthActivityCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthActivityCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
