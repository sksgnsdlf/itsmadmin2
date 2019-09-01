import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemeenrollmentComponent } from './themeenrollment.component';

describe('ThemeenrollmentComponent', () => {
  let component: ThemeenrollmentComponent;
  let fixture: ComponentFixture<ThemeenrollmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThemeenrollmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThemeenrollmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
