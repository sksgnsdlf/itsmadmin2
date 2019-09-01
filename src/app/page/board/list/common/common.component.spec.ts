import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCommonComponent } from './common.component';

describe('ListComponent', () => {
  let component: ListCommonComponent;
  let fixture: ComponentFixture<ListCommonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListCommonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCommonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
