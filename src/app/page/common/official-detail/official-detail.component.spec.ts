import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficialDetailComponent } from './official-detail.component';

describe('OfficialDetailComponent', () => {
  let component: OfficialDetailComponent;
  let fixture: ComponentFixture<OfficialDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfficialDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfficialDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
