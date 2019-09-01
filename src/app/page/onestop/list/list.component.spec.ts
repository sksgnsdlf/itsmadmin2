import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnestopListComponent } from './list.component';

describe('ListComponent', () => {
  let component: OnestopListComponent;
  let fixture: ComponentFixture<OnestopListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnestopListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnestopListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
