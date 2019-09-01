import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChnlPostComponent } from './chnl-post.component';

describe('ChnlPostComponent', () => {
  let component: ChnlPostComponent;
  let fixture: ComponentFixture<ChnlPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChnlPostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChnlPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
