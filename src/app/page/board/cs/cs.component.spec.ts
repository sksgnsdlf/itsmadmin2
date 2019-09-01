import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CSComponent } from './cs.component';

describe('SatisfactionComponent', () => {
  let component: CSComponent;
  let fixture: ComponentFixture<CSComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CSComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CSComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
