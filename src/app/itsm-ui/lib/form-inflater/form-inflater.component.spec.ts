import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormInflaterComponent } from './form-inflater.component';

describe('FormInflaterComponent', () => {
  let component: FormInflaterComponent;
  let fixture: ComponentFixture<FormInflaterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormInflaterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormInflaterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
