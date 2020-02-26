import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportsCardComponent } from './reports-card.component';

describe('ReportsCardComponent', () => {
  let component: ReportsCardComponent;
  let fixture: ComponentFixture<ReportsCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportsCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
