import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplDetailComponent } from './appl-detail.component';

describe('ApplDetailComponent', () => {
  let component: ApplDetailComponent;
  let fixture: ComponentFixture<ApplDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
