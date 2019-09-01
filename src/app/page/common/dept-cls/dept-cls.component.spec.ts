import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeptClsComponent } from './dept-cls.component';

describe('DeptClsComponent', () => {
  let component: DeptClsComponent;
  let fixture: ComponentFixture<DeptClsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeptClsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeptClsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
