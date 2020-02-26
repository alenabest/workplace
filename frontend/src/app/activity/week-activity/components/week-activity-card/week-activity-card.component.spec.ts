import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeekActivityCardComponent } from './week-activity-card.component';

describe('WeekActivityCardComponent', () => {
  let component: WeekActivityCardComponent;
  let fixture: ComponentFixture<WeekActivityCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeekActivityCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeekActivityCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
