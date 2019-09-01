import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TurnReportComponent } from './turn-report.component';

describe('TurnReportComponent', () => {
  let component: TurnReportComponent;
  let fixture: ComponentFixture<TurnReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TurnReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TurnReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
