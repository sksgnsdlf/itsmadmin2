import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyTurnReportComponent } from './turn-report.component';

describe('TurnReportComponent', () => {
  let component: MyTurnReportComponent;
  let fixture: ComponentFixture<MyTurnReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyTurnReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyTurnReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
