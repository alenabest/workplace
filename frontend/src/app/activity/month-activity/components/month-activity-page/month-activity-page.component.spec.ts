import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthActivityPageComponent } from './month-activity-page.component';

describe('MonthActivityPageComponent', () => {
  let component: MonthActivityPageComponent;
  let fixture: ComponentFixture<MonthActivityPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonthActivityPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthActivityPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
