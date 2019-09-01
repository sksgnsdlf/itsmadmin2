import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupStatComponent } from './group-stat.component';

describe('GroupStatComponent', () => {
  let component: GroupStatComponent;
  let fixture: ComponentFixture<GroupStatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupStatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupStatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
