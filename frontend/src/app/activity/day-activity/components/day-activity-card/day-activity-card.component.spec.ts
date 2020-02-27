import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DayActivityCardComponent } from './day-activity-card.component';

describe('DayActivityCardComponent', () => {
  let component: DayActivityCardComponent;
  let fixture: ComponentFixture<DayActivityCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DayActivityCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DayActivityCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
