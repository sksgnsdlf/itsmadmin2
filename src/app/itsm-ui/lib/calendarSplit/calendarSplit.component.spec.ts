import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarSplitComponent } from './calendarSplit.component';

describe('CalendarSplitComponent', () => {
  let component: CalendarSplitComponent;
  let fixture: ComponentFixture<CalendarSplitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendarSplitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarSplitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
