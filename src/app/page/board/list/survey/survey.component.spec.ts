import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSurveyComponent } from './survey.component';

describe('ListComponent', () => {
  let component: ListSurveyComponent;
  let fixture: ComponentFixture<ListSurveyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListSurveyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListSurveyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
