import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DayActivityPageComponent } from './day-activity-page.component';

describe('DayActivityPageComponent', () => {
  let component: DayActivityPageComponent;
  let fixture: ComponentFixture<DayActivityPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DayActivityPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DayActivityPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
