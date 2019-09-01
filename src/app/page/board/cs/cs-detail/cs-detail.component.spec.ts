import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CSDetailComponent } from './cs-detail.component';

describe('CSDetailComponent', () => {
  let component: CSDetailComponent;
  let fixture: ComponentFixture<CSDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CSDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CSDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
