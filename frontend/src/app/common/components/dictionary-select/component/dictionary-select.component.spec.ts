import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DictionarySelectComponent } from './dictionary-select.component';

describe('DictionarySelectComponent', () => {
  let component: DictionarySelectComponent;
  let fixture: ComponentFixture<DictionarySelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DictionarySelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DictionarySelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
