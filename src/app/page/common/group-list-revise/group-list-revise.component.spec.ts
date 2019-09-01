import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupListReviseComponent } from './group-list-revise.component';

describe('GroupListReviseComponent', () => {
  let component: GroupListReviseComponent;
  let fixture: ComponentFixture<GroupListReviseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupListReviseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupListReviseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
