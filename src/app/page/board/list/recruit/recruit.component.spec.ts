import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListRecruitComponent } from './recruit.component';

describe('ListComponent', () => {
  let component: ListRecruitComponent;
  let fixture: ComponentFixture<ListRecruitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListRecruitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListRecruitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
