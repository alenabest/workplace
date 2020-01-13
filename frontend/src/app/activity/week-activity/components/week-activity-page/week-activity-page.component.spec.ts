import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeekActivityPageComponent } from './week-activity-page.component';

describe('WeekActivityPageComponent', () => {
  let component: WeekActivityPageComponent;
  let fixture: ComponentFixture<WeekActivityPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeekActivityPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeekActivityPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
