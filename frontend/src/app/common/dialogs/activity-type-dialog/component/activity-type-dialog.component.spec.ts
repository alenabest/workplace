import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityTypeDialogComponent } from './activity-type-dialog.component';

describe('ActivityTypeDialogComponent', () => {
  let component: ActivityTypeDialogComponent;
  let fixture: ComponentFixture<ActivityTypeDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivityTypeDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityTypeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
