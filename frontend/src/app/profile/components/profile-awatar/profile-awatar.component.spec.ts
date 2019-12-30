import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileAwatarComponent } from './profile-awatar.component';

describe('ProfileAwatarComponent', () => {
  let component: ProfileAwatarComponent;
  let fixture: ComponentFixture<ProfileAwatarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileAwatarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileAwatarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
