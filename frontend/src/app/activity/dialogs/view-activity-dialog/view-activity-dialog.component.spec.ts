import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewActivityDialogComponent } from './view-activity-dialog.component';

describe('ViewActivityDialogComponent', () => {
  let component: ViewActivityDialogComponent;
  let fixture: ComponentFixture<ViewActivityDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewActivityDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewActivityDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
