import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListLectureComponent } from './lecture.component';

describe('ListComponent', () => {
  let component: ListLectureComponent;
  let fixture: ComponentFixture<ListLectureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListLectureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListLectureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
