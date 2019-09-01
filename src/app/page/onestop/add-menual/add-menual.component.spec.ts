import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMenualComponent } from './add-menual.component';

describe('AddMenualComponent', () => {
  let component: AddMenualComponent;
  let fixture: ComponentFixture<AddMenualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddMenualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMenualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
