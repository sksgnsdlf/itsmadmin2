import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendDetailComponent } from './attend-detail.component';

describe('AttendDetailComponent', () => {
  let component: AttendDetailComponent;
  let fixture: ComponentFixture<AttendDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttendDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
