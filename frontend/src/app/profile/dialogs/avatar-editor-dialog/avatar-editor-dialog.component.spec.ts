import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvatarEditorDialogComponent } from './avatar-editor-dialog.component';

describe('AvatarEditorComponent', () => {
  let component: AvatarEditorDialogComponent;
  let fixture: ComponentFixture<AvatarEditorDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvatarEditorDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvatarEditorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
