import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UrbanComponent } from './urban.component';

describe('UrbanComponent', () => {
  let component: UrbanComponent;
  let fixture: ComponentFixture<UrbanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UrbanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UrbanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
